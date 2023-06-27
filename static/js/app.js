function buildMetadata(sample) {
    // Access the website and use d3 to operate on the data
  
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
      
    d3.json(url).then((data) => {
      // Filter the data for the object with the desired sample number (the id)
        let metadata = data.metadata;
        let filteredArray = metadata.filter(sample0bj => sample0bj.id == sample);
        let result = filteredArray[0];
      // Select the panel with id of `#sample-metadata`
        let panel = d3.select("#sample-metadata");
  
      // Clear existing metadata - use `.html("")`
        panel.html("")
  
      // Append new tags for each key-value in the metadata
        for (key in result){
            panel.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
        };
  
      // If you want to do the bonus, you can make the gauge chart here

        //buildGauge(result.wfreq)



    });
  

  
  };
  
  function buildCharts(sample) {
    // Access the website and use .then to operate on the data
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
  
    d3.json(url).then((data) => {
      // Filter the data for the object with the desired sample number (the id)
      let sampledata = data.samples;
      let filteredArray = sampledata.filter(sample0bj => sample0bj.id == sample);
      let result = filteredArray[0];
  
      // Pull the desired information (ids, labels, values) from your filtered data
      // let otuID = Object.values(result.otu_ids)
      let otu_id = Object.values(result.otu_ids);
      let otu_sample = Object.values(result.sample_values);
      let otu_labels = Object.values(result.otu_labels)

      // Build a Bubble Chart
      let bubble = [{
        x: otu_id,
        y: otu_sample,
        mode: 'markers',
        marker: {
          size: otu_sample,
          color: otu_id,
          cmin:0,
          cmax:3500,
          colorscale: 'Rainbow'
        },
        type: 'bubble',
        text: otu_labels
      }];
      let layout = {
        xaxis: {
          title: {
            text: "OTU ID"}
      },
        height: 600,
        width: 1100
      };
      Plotly.newPlot("bubble", bubble, layout);
      // Slice the data for your bar chart and order it (you can just use reverse)
      let bar_chart_id = otu_id.slice(0,10);
      let bar_chart_data = otu_sample.slice(0,10);
      let bar_chart_hovers = otu_labels.slice(0,10);
      bar_chart_data = bar_chart_data.reverse();
      bar_chart_id = bar_chart_id.reverse();
      bar_chart_hovers = bar_chart_hovers.reverse();

      bar_chart_labels = [];
      for (i = 0; i < bar_chart_id.length; i++){
        bar_chart_labels.push('OTU ' + bar_chart_id[i])
      };
      
      // Build a Horizontal Bar Chart
      let bar = [{
        x: bar_chart_data,
        y:bar_chart_labels,
        type: 'bar',
        orientation: 'h',
        text: bar_chart_hovers
      }];
      layout = {
        height: 500,
        width: 300
      };
      Plotly.newPlot('bar',bar,layout);

    });
  };
  
  function init() {
    // Get the reference to the dropdown menu
    let selector = d3.select("#selDataset");

    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    // Use the list of sample names to populate the select options
    d3.json(url).then((data) => {
    // Do this by pulling the array associated with `names` 
        let idNames = data.names;
  
      // Loop through the names and append to the dropdown menu
        for (let i = 0; i < idNames.length; i++){

            selector.append("option").text(idNames[i]).property("value",idNames[i])

        };
  
      // Use the first sample from the list to build the initial plots
        let firstSample = idNames[0];

          buildCharts(firstSample);
          buildMetadata(firstSample);

    });
  };
  
  function optionChanged(newSample) {
    // Change your data and update your plots/metadata when newSample is selected from the dropdown
    buildCharts(newSample);
    buildMetadata(newSample);
  };
  
  // Initialize the dashboard
  init();