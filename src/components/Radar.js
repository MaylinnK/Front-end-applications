import useD3 from "../hooks/useD3";
import * as d3 from "d3";
import { useContext } from "react";
import BerryContext from "../providers/BerryContext";

function RadarChart({ id, options, data }) {
  data = useContext(BerryContext);
  id = "#chart";
  const ref = useD3((svg) => {
    // Maakt een lijst van eigenschappen aan voor de chart om later gemakkelijk aanpassingen te maken.
    let cfg = {
      radius: 5,
      w: 250,
      h: 250,
      factor: 1,
      factorLegend: 0.85,
      levels: 4,
      maxValue: 20,
      radians: 2 * Math.PI,
      opacityArea: 0.3,
      ToRight: 5,
      TranslateX: 80,
      TranslateY: 30,
      ExtraWidthX: 165,
      ExtraWidthY: 70,
      color: d3.scaleOrdinal().range(["#87de16"]),
    };

    // Wat variabelen voor de aankomende functies.
    const allAxis = ["spicy", "dry", "sweet", "bitter", "sour"];
    let total = allAxis.length;
    let radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);

    let g = svg
      // .select()
      .attr("width", cfg.w + cfg.ExtraWidthX)
      .attr("height", cfg.h + cfg.ExtraWidthY)
      .append("g")
      .attr(
        "transform",
        "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")"
      );

    // Maakt de vijfhoeken aan en positioneert ze in elkaar.
    for (let j = 0; j < cfg.levels; j++) {
      let levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
        g
          .selectAll(".levels")
          .data(allAxis)
          .enter()
          .append("svg:line")
          // maakt 1 voor 1 de lijnen van de zeshoeken aan.
          .attr("x1", function (d, i) {
            return (
              levelFactor *
              (1 - cfg.factor * Math.sin((i * cfg.radians) / total))
            );
          })
          .attr("y1", function (d, i) {
            return (
              levelFactor *
              (1 - cfg.factor * Math.cos((i * cfg.radians) / total))
            );
          })
          .attr("x2", function (d, i) {
            return (
              levelFactor *
              (1 - cfg.factor * Math.sin(((i + 1) * cfg.radians) / total))
            );
          })
          .attr("y2", function (d, i) {
            return (
              levelFactor *
              (1 - cfg.factor * Math.cos(((i + 1) * cfg.radians) / total))
            );
          })
          .attr("class", "line")
          .style("stroke", "#5f8e0c")
          .style("stroke-opacity", "0.7")
          .style("stroke-width", "1.5px")
          .attr(
            "transform",
            "translate(" +
              (cfg.w / 2 - levelFactor) +
              ", " +
              (cfg.h / 2 - levelFactor) +
              ")"
      );
    }
    let series = 0;

    // Maakt groepen aan voor de axis lijnen
    let axis = g
      .selectAll(".axis")
      .data(allAxis)
      .enter()
      .append("g")
      .attr("class", "axis");

    //Maakt de axis lijnen aan.
axis
      .append("line")
      .attr("x1", cfg.w / 2)
      .attr("y1", cfg.h / 2)
      .attr("x2", function (d, i) {
        return (
          (cfg.w / 2) * (1 - cfg.factor * Math.sin((i * cfg.radians) / total))
        );
      })
      .attr("y2", function (d, i) {
        return (
          (cfg.h / 2) * (1 - cfg.factor * Math.cos((i * cfg.radians) / total))
        );
      })
      .attr("class", "line")
      .style("stroke", "#5f8e0c")
      .style("stroke-width", "2px");

    // Voegt de labels toe aan de chart.
axis
      .append("text")
      .attr("class", "legend")
      .text(function (d) {
        return d;
      })
      .style("font-family", "sans-serif")
      .style("font-size", "18px")
      .style("text-transform", "capitalize")
      .style("fill", "#5f8e0c")
      .attr("text-anchor", "middle")
      .attr("dy", "1.5em")
      .attr("transform", function (d, i) {
        return "translate(0, -10)";
      })
      // Positioneert de labels op de hoeken.
      .attr("x", function (d, i) {
        return (
          (cfg.w / 2) *
            (1 - cfg.factorLegend * Math.sin((i * cfg.radians) / total)) -
          65 * Math.sin((i * cfg.radians) / total)
        );
      })
      .attr("y", function (d, i) {
        return (
          (cfg.h / 2) * (1 - Math.cos((i * cfg.radians) / total)) -
          25 * Math.cos((i * cfg.radians) / total)
        );
      });

    if (!data) {
      return <h1>Geen data in radar.js</h1>;
    }

    // Laadt alle data in de chart.
    function loadData(d, berry, tooltip, dataValues, potencyData, z) {
      // Delete huidige data in de chart.
      svg.selectAll(".poly").remove();
      // Haalt de id op van de geselecteerde radiobutton.
      berry = document.querySelector('input[type="radio"]:checked').id;
      dataValues = [];
      potencyData = [];
      potencyData.push(data[berry].flavors);
      // Loopt door de potencies heen en zet deze om naar coordinaten op de chart.
      potencyData.forEach(function (y, x) {
        g.selectAll(".nodes").data(y, (j, i) => {
          dataValues.push([
            (cfg.w / 2) *
              (1 -
                (parseFloat(Math.max(j.potency + 5, 0)) / cfg.maxValue) *
                  cfg.factor *
                  Math.sin((i * cfg.radians) / total)),
            (cfg.h / 2) *
              (1 -
                (parseFloat(Math.max(j.potency + 5, 0)) / cfg.maxValue) *
                  cfg.factor *
                  Math.cos((i * cfg.radians) / total)),
          ]);
        });
      });

      // Gebruikt de coordinaten om de radar op de chart te zetten.
       g
        .selectAll(".area")
        .data([dataValues])
        .join(function (enter) {
          return (
            enter
              .append("polygon")
              .attr("class", "radar-chart-serie" + series + " poly")
              .style("stroke-width", "1.5px")
              .style("stroke", cfg.color(series))
              .attr("points", function (d) {
                let str = "";
                for (let pti = 0; pti < d.length; pti++) {
                  str = str + d[pti] + "," + d[pti] + " ";
                }
                return str;
              })
              .style("fill", function (i, j) {
                return cfg.color(series);
              })
              .style("fill-opacity", cfg.opacityArea)

              // Animatie als je over de radar hovert.
              .on("mouseover", function (d) {
                z = "polygon." + d3.select(this).attr("class");
                g.selectAll("polygon")
                  .transition(200)
                  .style("fill-opacity", 0.1);
                g.selectAll(z).transition(200).style("fill-opacity", 0.7);
              })
              .on("mouseout", function () {
                g.selectAll("polygon")
                  .transition(200)
                  .style("fill-opacity", cfg.opacityArea);
              })
          );
        });

      series = 0;

      // Maakt cirkels aan per hoek om de potency te kunnen zien.
      tooltip = d3.select("body").append("div").attr("class", "toolTip");
      potencyData = [potencyData];
      // Haalt weer de potency data op en en zet deze om naar coordinaten.
      potencyData[0].forEach(function (y, x) {
          g
            .selectAll(".nodes")
            .data(y)
            .enter()
            .append("svg:circle")
            .attr("class", "radar-chart-serie" + series + " poly")
            .attr("r", cfg.radius)
            .attr("alt", function (j) {
              return Math.max(j.value, 0);
            })
            .attr("cx", function (j, i) {
              dataValues.push([
                (cfg.w / 2) *
                  (1 -
                    (parseFloat(Math.max(j.potency + 5, 0)) / cfg.maxValue) *
                      cfg.factor *
                      Math.sin((i * cfg.radians) / total)),
                (cfg.h / 2) *
                  (1 -
                    (parseFloat(Math.max(j.potency + 5, 0)) / cfg.maxValue) *
                      cfg.factor *
                      Math.cos((i * cfg.radians) / total)),
              ]);
              return (
                (cfg.w / 2) *
                (1 -
                  (Math.max(j.potency + 5, 0) / cfg.maxValue) *
                    cfg.factor *
                    Math.sin((i * cfg.radians) / total))
              );
            })
            .attr("cy", function (j, i) {
              return (
                (cfg.h / 2) *
                (1 -
                  (Math.max(j.potency + 5, 0) / cfg.maxValue) *
                    cfg.factor *
                    Math.cos((i * cfg.radians) / total))
              );
            })
            .style("fill", "#fff")
            .style("stroke-width", "1px")
            .style("stroke", cfg.color(series))
            .style("fill-opacity", 0)

            // Hover reactie om de tooltip te kunnen zien.
            .on("mouseover", function (event, j) {
              tooltip
                .style("left", event.pageX - 40 + "px")
                .style("top", event.pageY - 80 + "px")
                .style("display", "inline-block")
                .html("Potency" + "<br><span>" + j.potency + "</span>");
              g.style("fill-opacity", 1);
            })
            .on("mouseout", function (d) {
              tooltip.style("display", "none");
            })
        series++;
      });
    }

    // Laadt overige data in de browser.
    function textData(berry) {
      berry = d3.select('input[type="radio"]:checked').property("id");
      d3.select("h1").html(data[berry].name)
      d3.select("#firmness").html(data[berry].firmness.name)
      d3.select("#growth").html(data[berry].growth_time)
      d3.select("#harvest").html(data[berry].max_harvest)
      d3.select("#size").html(data[berry].size)
      d3.select("#smoothness").html(data[berry].smoothness)
      d3.select("#dryness").html(data[berry].soil_dryness)
    }
    // Voegt event listeners toe aan de radiobuttons.
    const buttons = d3.selectAll("input");
    for (const button of buttons) {
      button.addEventListener("click", loadData);
      button.addEventListener("click", textData);
    }
  });
  return (
    <div id="chart">
      <svg
        ref={ref}
      >
      </svg>
    </div>
  );
}

export default RadarChart;
