
console.log(batting_data)
console.log(pitching_data)

/////define funciton to zip arrays together for tool tip on plotly charts
const zip = (arr, ...arrs) => {
  return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
}

const batting_names=batting_data['Name']
const batting_teams=batting_data['Team']
const batting_POS=batting_data['POS']
batting_tooltip=zip(batting_names, batting_teams, batting_POS)

const pitching_names=pitching_data['Name']
const pitching_teams=pitching_data['Team']
pitching_tooltip=zip(pitching_names, pitching_teams)


////////Function to build charts/////////
function build_plot_batting(xaxis, yaxis) {   
  // If xaxis==yaxis, plot a histogram
  if (xaxis==yaxis){
    var trace = {
        x: batting_data[xaxis],
        type: 'histogram',
        marker: {
          color: "rgba(100, 200, 102, 0.7)",
           line: {
            color:  "rgba(100, 200, 102, 1)", 
            width: 1
            } 
          }
      };
    var data = [trace];
    var layout={
      title: `Histogram of ${xaxis}`,
      yaxis: {
        title: `Count of players`,
        titlefont: {
          size: 16
          }
      },
      xaxis: {
        title: `Value of ${xaxis}`,
        titlefont: {
          size: 16
          }
      }
    }
    Plotly.newPlot('battingchart', data, layout);
  }
  // if xaxis != yaxis, plot a scatter plot
  if (xaxis!=yaxis){
    var trace={
      x: batting_data[xaxis],
      y: batting_data[yaxis],
      mode: 'markers',
      type: 'scatter',
      marker:{
        color: batting_data['Cluster_label']
      },
      text: batting_tooltip,
      hovertemplate: '<i>Name</i>: %{text[0]}<br>'+
                     '<i>Team</i>: %{text[1]}<br>'+
                     '<i>POS</i>: %{text[2]}<br>'+
                    '%{yaxis.title.text}: %{y:.2f}<br>' +
                    '%{xaxis.title.text}: %{x:.2}<br>'
    }
    var data=[trace]
    var layout={
      hovermode:'closest',
      title: "Batting Bivariate Feature Comparison",
      yaxis: {
        title: yaxis,
        titlefont: {
          size: 16
          }
      },
      xaxis: {
        title: xaxis,
        titlefont: {
          size: 16
          }
      }
    }
    Plotly.newPlot('battingchart', data, layout)
  }
}

function build_plot_pitching(xaxis, yaxis) {   
  // If xaxis==yaxis, plot a histogram
  if (xaxis==yaxis){
    var trace = {
        x: pitching_data[xaxis],
        type: 'histogram',
        marker: {
          color: "rgba(100, 200, 102, 0.7)",
           line: {
            color:  "rgba(100, 200, 102, 1)", 
            width: 1
            } 
          }
      };
    var data = [trace];
    var layout={
      title: `Histogram of ${xaxis}`,
      yaxis: {
        title: `Count of players`,
        titlefont: {
          size: 16
          }
      },
      xaxis: {
        title: `Value of ${xaxis}`,
        titlefont: {
          size: 16
          }
      }
    }
    Plotly.newPlot('pitchingchart', data, layout);
  }
  // if xaxis != yaxis, plot a scatter plot
  if (xaxis!=yaxis){
    var trace={
      x: pitching_data[xaxis],
      y: pitching_data[yaxis],
      mode: 'markers',
      type: 'scatter',
      marker:{
        color: pitching_data['Cluster_label']
      },
      text: pitching_tooltip,
      hovertemplate: '<i>Name</i>: %{text[0]}<br>'+
                     '<i>Team</i>: %{text[1]}<br>'+
                    '%{yaxis.title.text}: %{y:.2f}<br>' +
                    '%{xaxis.title.text}: %{x:.2}<br>'
    }
    var data=[trace]
    var layout={
      hovermode:'closest',
      title: "Pitching Bivariate Feature Comparison",
      yaxis: {
        title: yaxis,
        titlefont: {
          size: 16
          }
      },
      xaxis: {
        title: xaxis,
        titlefont: {
          size: 16
          }
      }
    }
    Plotly.newPlot('pitchingchart', data, layout)
  }
}
    
////// Setting up Init Function ////////
function init_batting() {
    // Grab a reference to the dropdown select elements
    var xaxis_batting = d3.select("#xaxis_batting");
    var yaxis_batting = d3.select('#yaxis_batting');
    axis_options_batting=[]
    Object.keys(batting_data).forEach(function(key){
        if (key == 'Cluster_label' || key == 'Name' || key =='Team' || key =='id' || key =='POS'){
        }
        else {
            axis_options_batting.push(key)
        }
    })

    axis_options_batting.forEach((item) => {
    xaxis_batting
        .append("option")
        .text(item)
        .property("value", item);
    yaxis_batting
        .append("option")
        .text(item)
        .property("value", item);
    });

      const firstxaxis_batting = xaxis_batting.property('value')
      const firstyaxis_batting= yaxis_batting.property('value')

      build_plot_batting(firstxaxis_batting, firstyaxis_batting);
    };

////// Setting up Init Function ////////
function init_pitching() {
  // Grab a reference to the dropdown select elements
  var xaxis_pitching = d3.select("#xaxis_pitching");
  var yaxis_pitching = d3.select('#yaxis_pitching');
  axis_options_pitching=[]
  Object.keys(pitching_data).forEach(function(key){
      if (key == 'Cluster_label' || key == 'Name' || key =='Team' || key =='id' || key =='POS'){
      }
      else {
          axis_options_pitching.push(key)
      }
  })

  axis_options_pitching.forEach((item) => {
  xaxis_pitching
      .append("option")
      .text(item)
      .property("value", item);
  yaxis_pitching
      .append("option")
      .text(item)
      .property("value", item);
  });

    const firstxaxis_pitching = xaxis_pitching.property('value')
    const firstyaxis_pitching= yaxis_pitching.property('value')

    build_plot_pitching(firstxaxis_pitching, firstyaxis_pitching);
  };


// Initialize the dashboard
init_batting();
init_pitching();
    
// ///////Functionality for changing of category/////////
var xaxis_batting = d3.select("#xaxis_batting");
var yaxis_batting = d3.select('#yaxis_batting');

xaxis_batting.on("change", function() {
    d3.event.preventDefault();
    var xaxis_batting_value=xaxis_batting.property('value')
    var yaxis_batting_value=yaxis_batting.property('value')
    build_plot_batting(xaxis_batting_value, yaxis_batting_value)
})

yaxis_batting.on("change", function() {
    d3.event.preventDefault();
    var xaxis_batting_value=xaxis_batting.property('value')
    var yaxis_batting_value=yaxis_batting.property('value')
    build_plot_batting(xaxis_batting_value, yaxis_batting_value)
})

// ///////Functionality for changing of category/////////
var xaxis_pitching = d3.select("#xaxis_pitching");
var yaxis_pitching = d3.select('#yaxis_pitching');

xaxis_pitching.on("change", function() {
    d3.event.preventDefault();
    var xaxis_pitching_value=xaxis_pitching.property('value')
    var yaxis_pitching_value=yaxis_pitching.property('value')
    build_plot_pitching(xaxis_pitching_value, yaxis_pitching_value)
})

yaxis_pitching.on("change", function() {
  d3.event.preventDefault();
  var xaxis_pitching_value=xaxis_pitching.property('value')
  var yaxis_pitching_value=yaxis_pitching.property('value')
  build_plot_pitching(xaxis_pitching_value, yaxis_pitching_value)
})
