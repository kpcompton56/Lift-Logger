//for showing/hiding add widget fields
function toggle(x, y, z)
{
    if (x.style.display === "none")
    {
        x.style.display = "flex";
        x.style.margin = "2px 5px 2px 5px";
        if (document.getElementById("tracking_method").value === "Track muscle group")
        {
            z.style.display = "flex";
            z.style.margin = "2px 5px 2px 5px";
        }
        else if (document.getElementById("tracking_method").value === "Track exercise")
        {
            y.style.display = "flex";
            y.style.margin = "2px 5px 2px 5px";
            y.style.width = "100px";
        }
    }
    else
    {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "none";
    }
}

//for selecting tracking method
function widget_specifier(x, y)
{
    if (document.getElementById("tracking_method").value === "Track muscle group")
    {
        x.style.display = "none";
        y.style.display = "flex";
    }
    else
    {
        x.style.display = "flex";
        y.style.display = "none";
    }
}

//for displaying add widget fields
function buttonfunction()
{
    document.getElementById("AddButton").style.display = "flex";
}

function exc_field_displayer(element, lift_array, cardio_array, last_workout_array)
{
  var lift_test = lift_array.includes(element.value);
  var cardio_test = cardio_array.includes(element.value);

  var this_exc_selector = element;
  var this_new_exc_div = element.parentNode.parentNode.children[1];
  var this_lift_div = element.parentNode.parentNode.children[2];
  var this_cardio_div = element.parentNode.parentNode.children[3];
  var this_buttons_div = element.parentNode.parentNode.children[4];
  var this_hist_button = element.parentNode.parentNode.lastElementChild.lastElementChild;

  var i
  for (i = 0; i < last_workout_array.length; i++) {

    if (last_workout_array[i][1] == this_exc_selector.value) {
      this_lift_div.firstElementChild.placeholder = last_workout_array[i][2][0];

      this_lift_div.firstElementChild.placeholder.style.color = "red";

      this_lift_div.firstElementChild.nextElementSibling.nextElementSibling.placeholder = last_workout_array[i][2][1];
      this_lift_div.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.placeholder = last_workout_array[i][2][2];
    }
  }

  if (lift_test)
  {
    this_lift_div.style.display = "flex";
    this_cardio_div.style.display = "none";
    this_buttons_div.style.display = "flex";
    this_new_exc_div.style.display = "none";
    this_hist_button.style.display = "flex";
  }
  else if (cardio_test)
  {
    this_lift_div.style.display = "none";
    this_cardio_div.style.display = "flex";
    this_buttons_div.style.display = "flex";
    this_new_exc_div.style.display = "none";
    this_hist_button.style.display = "flex";
  }
  else
  {
    this_lift_div.style.display = "none";
    this_cardio_div.style.display = "none";
    this_new_exc_div.style.display = "flex";

    if (element.parentNode.nextElementSibling.firstElementChild.nextElementSibling.value === "")
    {
      this_buttons_div.style.display = "none";
    }
    else
    {
      if (element.parentNode.nextElementSibling.firstElementChild.nextElementSibling.value === "Cardio")
      {
        this_cardio_div.style.display = "flex";
      }
      else
      {
        this_lift_div.style.display = "flex";
      }
      this_buttons_div.style.display = "flex";
      this_hist_button.style.display = "none";
    }
  }
}

function chart_loader(array, workouts_week_data) {
  //for workouts per week chart

  var ctx = document.getElementById('myChart');
  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: workouts_week_data[0][0],
      datasets: [{
        label: "workouts per week",
        data: workouts_week_data[0][1],
        backgroundColor: 'rgba(92,103,125, 0.5)',
        borderColor: 'rgba(92,103,125, 1)',
        borderWidth: 1
      }],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              precision: 0,
                    beginAtZero: true
            }
          }
        ]
      }
    }
  });

  //for chart widgets in user_widget_data
  var i;
  for (i=0; i < array.length; i++) {
    var element
    element = document.getElementById(array[i][1]);

    if (array[i][1] == 'Abs') {
      if (element != null) {
        AbsChart = new Chart(element, {
        type: 'bar',
          data: {
            labels: array[i][3][0][0],
            datasets: [{
              label: "workouts per week",
              data: array[i][3][0][1],
              backgroundColor: 'rgba(92,103,125, 0.5)',
              borderColor: 'rgba(92,103,125, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    precision: 0,
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      }
    }
    else if (array[i][1] == 'Back') {
      if (element != null) {
        BackChart = new Chart(element, {
        type: 'bar',
          data: {
            labels: array[i][3][0][0],   //array[i][3][0]
            datasets: [{
              label: "workouts per week",
              data: array[i][3][0][1],                     //array[i][3][1]
              backgroundColor: 'rgba(92,103,125, 0.5)',
              borderColor: 'rgba(92,103,125, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    precision: 0,
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      }
    }
    else if (array[i][1] == 'Biceps') {
      if (element != null) {
        BicepsChart = new Chart(element, {
        type: 'bar',
          data: {
            labels: array[i][3][0][0],   //array[i][3][0]
            datasets: [{
              label: "workouts per week",
              data: array[i][3][0][1],                     //array[i][3][1]
              backgroundColor: 'rgba(92,103,125, 0.5)',
              borderColor: 'rgba(92,103,125, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    precision: 0,
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      }
    }
    else if (array[i][1] == 'Cardio') {
      if (element != null) {
        CardioChart = new Chart(element, {
        type: 'bar',
          data: {
            labels: array[i][3][0][0],   //array[i][3][0]
            datasets: [{
              label: "workouts per week",
              data: array[i][3][0][1],                     //array[i][3][1]
              backgroundColor: 'rgba(92,103,125, 0.5)',
              borderColor: 'rgba(92,103,125, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    precision: 0,
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      }
    }
    else if (array[i][1] == 'Chest') {
      if (element != null) {
        ChestChart = new Chart(element, {
        type: 'bar',
          data: {
            labels: array[i][3][0][0],   //array[i][3][0]
            datasets: [{
              label: "workouts per week",
              data: array[i][3][0][1],                     //array[i][3][1]
              backgroundColor: 'rgba(92,103,125, 0.5)',
              borderColor: 'rgba(92,103,125, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    precision: 0,
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      }
    }
    else if (array[i][1] == 'Forearms') {
      if (element != null) {
        ForearmsChart = new Chart(element, {
        type: 'bar',
          data: {
            labels: array[i][3][0][0],   //array[i][3][0]
            datasets: [{
              label: "workouts per week",
              data: array[i][3][0][1],                     //array[i][3][1]
              backgroundColor: 'rgba(92,103,125, 0.5)',
              borderColor: 'rgba(92,103,125, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    precision: 0,
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      }
    }
    else if (array[i][1] == 'Legs') {
      if (element != null) {
        LegsChart = new Chart(element, {
        type: 'bar',
          data: {
            labels: array[i][3][0][0],   //array[i][3][0]
            datasets: [{
              label: "workouts per week",
              data: array[i][3][0][1],                     //array[i][3][1]
              backgroundColor: 'rgba(92,103,125, 0.5)',
              borderColor: 'rgba(92,103,125, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    precision: 0,
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      }
    }
    else if (array[i][1] == 'Shoulders') {
      if (element != null) {
        ShouldersChart = new Chart(element, {
        type: 'bar',
          data: {
            labels: array[i][3][0][0],   //array[i][3][0]
            datasets: [{
              label: "workouts per week",
              data: array[i][3][0][1],                     //array[i][3][1]
              backgroundColor: 'rgba(92,103,125, 0.5)',
              borderColor: 'rgba(92,103,125, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    precision: 0,
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      }
    }
    else if (array[i][1] == 'Triceps') {
      if (element != null) {
        TricepsChart = new Chart(element, {
        type: 'bar',
          data: {
            labels: array[i][3][0][0],   //array[i][3][0]
            datasets: [{
              label: "workouts per week",
              data: array[i][3][0][1],                     //array[i][3][1]
              backgroundColor: 'rgba(92,103,125, 0.5)',
              borderColor: 'rgba(92,103,125, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    precision: 0,
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      }
    }
  }
}

function chart_updater(array, range_selector) {
  canvas_id = range_selector.parentNode.lastElementChild.id;

  if (canvas_id == "Abs") {
    if (range_selector.value == "1 month") {
      var i;
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          AbsChart.data.labels = array[i][3][0][0];
          AbsChart.data.datasets[0].data = array[i][3][0][1];
        }
      }
    }
    else if (range_selector.value == "3 months") {
      var i;
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          AbsChart.data.labels = array[i][3][1][0];
          AbsChart.data.datasets[0].data = array[i][3][1][1];
        }
      }
    }
    else if (range_selector.value == "6 months") {
      var i;
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          AbsChart.data.labels = array[i][3][2][0];
          AbsChart.data.datasets[0].data = array[i][3][2][1];
        }
      }
    }
    else if (range_selector.value == "1 year") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          AbsChart.data.labels = array[i][3][3][0];
          AbsChart.data.datasets[0].data = array[i][3][3][1];
        }
      }
    }
    else if (range_selector.value == "All time") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          AbsChart.data.labels = array[i][3][4][0];
          AbsChart.data.datasets[0].data = array[i][3][4][1];
        }
      }
    }

    AbsChart.update();

  }
  else if (canvas_id == "Back") {
    if (range_selector.value == "1 month") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          BackChart.data.labels = array[i][3][0][0];
          BackChart.data.datasets[0].data = array[i][3][0][1];
        }
      }
    }
    else if (range_selector.value == "3 months") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          BackChart.data.labels = array[i][3][1][0];
          BackChart.data.datasets[0].data = array[i][3][1][1];
        }
      }
    }
    else if (range_selector.value == "6 months") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          BackChart.data.labels = array[i][3][2][0];
          BackChart.data.datasets[0].data = array[i][3][2][1];
        }
      }
    }
    else if (range_selector.value == "1 year") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          BackChart.data.labels = array[i][3][3][0];
          BackChart.data.datasets[0].data = array[i][3][3][1];
        }
      }
    }
    else if (range_selector.value == "All time") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          BackChart.data.labels = array[i][3][4][0];
          BackChart.data.datasets[0].data = array[i][3][4][1];
        }
      }
    }

    BackChart.update();
  }
  else if (canvas_id == "Biceps") {
    if (range_selector.value == "1 month") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          BicepsChart.data.labels = array[i][3][0][0];
          BicepsChart.data.datasets[0].data = array[i][3][0][1];
        }
      }
    }
    else if (range_selector.value == "3 months") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          BicepsChart.data.labels = array[i][3][1][0];
          BicepsChart.data.datasets[0].data = array[i][3][1][1];
        }
      }
    }
    else if (range_selector.value == "6 months") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          BicepsChart.data.labels = array[i][3][2][0];
          BicepsChart.data.datasets[0].data = array[i][3][2][1];
        }
      }
    }
    else if (range_selector.value == "1 year") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          BicepsChart.data.labels = array[i][3][3][0];
          BicepsChart.data.datasets[0].data = array[i][3][3][1];
        }
      }
    }
    else if (range_selector.value == "All time") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          BicepsChart.data.labels = array[i][3][4][0];
          BicepsChart.data.datasets[0].data = array[i][3][4][1];
        }
      }
    }

    BicepsChart.update();
  }
  else if (canvas_id == "Cardio") {
    if (range_selector.value == "1 month") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          CardioChart.data.labels = array[i][3][0][0];
          CardioChart.data.datasets[0].data = array[i][3][0][1];
        }
      }
    }
    else if (range_selector.value == "3 months") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          CardioChart.data.labels = array[i][3][1][0];
          CardioChart.data.datasets[0].data = array[i][3][1][1];
        }
      }
    }
    else if (range_selector.value == "6 months") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          CardioChart.data.labels = array[i][3][2][0];
          CardioChart.data.datasets[0].data = array[i][3][2][1];
        }
      }
    }
    else if (range_selector.value == "1 year") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          CardioChart.data.labels = array[i][3][3][0];
          CardioChart.data.datasets[0].data = array[i][3][3][1];
        }
      }
    }
    else if (range_selector.value == "All time") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          CardioChart.data.labels = array[i][3][4][0];
          CardioChart.data.datasets[0].data = array[i][3][4][1];
        }
      }
    }

    CardioChart.update();
  }
  else if (canvas_id == "Chest") {
    if (range_selector.value == "1 month") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          ChestChart.data.labels = array[i][3][0][0];
          ChestChart.data.datasets[0].data = array[i][3][0][1];
        }
      }
    }
    else if (range_selector.value == "3 months") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          ChestChart.data.labels = array[i][3][1][0];
          ChestChart.data.datasets[0].data = array[i][3][1][1];
        }
      }
    }
    else if (range_selector.value == "6 months") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          ChestChart.data.labels = array[i][3][2][0];
          ChestChart.data.datasets[0].data = array[i][3][2][1];
        }
      }
    }
    else if (range_selector.value == "1 year") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          ChestChart.data.labels = array[i][3][3][0];
          ChestChart.data.datasets[0].data = array[i][3][3][1];
        }
      }
    }
    else if (range_selector.value == "All time") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          ChestChart.data.labels = array[i][3][4][0];
          ChestChart.data.datasets[0].data = array[i][3][4][1];
        }
      }
    }

    ChestChart.update();
  }
  else if (canvas_id == "Forearms") {
    if (range_selector.value == "1 month") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          ForearmsChart.data.labels = array[i][3][0][0];
          ForearmsChart.data.datasets[0].data = array[i][3][0][1];
        }
      }
    }
    else if (range_selector.value == "3 months") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          ForearmsChart.data.labels = array[i][3][1][0];
          ForearmsChart.data.datasets[0].data = array[i][3][1][1];
        }
      }
    }
    else if (range_selector.value == "6 months") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          ForearmsChart.data.labels = array[i][3][2][0];
          ForearmsChart.data.datasets[0].data = array[i][3][2][1];
        }
      }
    }
    else if (range_selector.value == "1 year") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          ForearmsChart.data.labels = array[i][3][3][0];
          ForearmsChart.data.datasets[0].data = array[i][3][3][1];
        }
      }
    }
    else if (range_selector.value == "All time") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          ForearmsChart.data.labels = array[i][3][4][0];
          ForearmsChart.data.datasets[0].data = array[i][3][4][1];
        }
      }
    }

    ForearmsChart.update();
  }
  else if (canvas_id == "Legs") {
    if (range_selector.value == "1 month") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          LegsChart.data.labels = array[i][3][0][0];
          LegsChart.data.datasets[0].data = array[i][3][0][1];
        }
      }
    }
    else if (range_selector.value == "3 months") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          LegsChart.data.labels = array[i][3][1][0];
          LegsChart.data.datasets[0].data = array[i][3][1][1];
        }
      }
    }
    else if (range_selector.value == "6 months") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          LegsChart.data.labels = array[i][3][2][0];
          LegsChart.data.datasets[0].data = array[i][3][2][1];
        }
      }
    }
    else if (range_selector.value == "1 year") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          LegsChart.data.labels = array[i][3][3][0];
          LegsChart.data.datasets[0].data = array[i][3][3][1];
        }
      }
    }
    else if (range_selector.value == "All time") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          LegsChart.data.labels = array[i][3][4][0];
          LegsChart.data.datasets[0].data = array[i][3][4][1];
        }
      }
    }

    LegsChart.update();
  }
  else if (canvas_id == "Shoulders") {
    if (range_selector.value == "1 month") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          ShouldersChart.data.labels = array[i][3][0][0];
          ShouldersChart.data.datasets[0].data = array[i][3][0][1];
        }
      }
    }
    else if (range_selector.value == "3 months") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          ShouldersChart.data.labels = array[i][3][1][0];
          ShouldersChart.data.datasets[0].data = array[i][3][1][1];
        }
      }
    }
    else if (range_selector.value == "6 months") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          ShouldersChart.data.labels = array[i][3][2][0];
          ShouldersChart.data.datasets[0].data = array[i][3][2][1];
        }
      }
    }
    else if (range_selector.value == "1 year") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          ShouldersChart.data.labels = array[i][3][3][0];
          ShouldersChart.data.datasets[0].data = array[i][3][3][1];
        }
      }
    }
    else if (range_selector.value == "All time") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          ShouldersChart.data.labels = array[i][3][4][0];
          ShouldersChart.data.datasets[0].data = array[i][3][4][1];
        }
      }
    }

    ShouldersChart.update();
  }
  else if (canvas_id == "Triceps") {
    if (range_selector.value == "1 month") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          TricepsChart.data.labels = array[i][3][0][0];
          TricepsChart.data.datasets[0].data = array[i][3][0][1];
        }
      }
    }
    else if (range_selector.value == "3 months") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          TricepsChart.data.labels = array[i][3][1][0];
          TricepsChart.data.datasets[0].data = array[i][3][1][1];
        }
      }
    }
    else if (range_selector.value == "6 months") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          TricepsChart.data.labels = array[i][3][2][0];
          TricepsChart.data.datasets[0].data = array[i][3][2][1];
        }
      }
    }
    else if (range_selector.value == "1 year") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          TricepsChart.data.labels = array[i][3][3][0];
          TricepsChart.data.datasets[0].data = array[i][3][3][1];
        }
      }
    }
    else if (range_selector.value == "All time") {
      for (i=0; i < array.length; i++) {
        if (array[i][1] == canvas_id) {
          TricepsChart.data.labels = array[i][3][4][0];
          TricepsChart.data.datasets[0].data = array[i][3][4][1];
        }
      }
    }

    TricepsChart.update();
  }
}

function workouts_week_updater(workouts_week_data) {
  range_selector = document.getElementById("workouts_week_date_range_selector")

  if (range_selector.value == "1 month") {
    myChart.data.labels = workouts_week_data[0][0];
    myChart.data.datasets[0].data = workouts_week_data[0][1];
  }
  else if (range_selector.value == "3 months") {
    myChart.data.labels = workouts_week_data[1][0];
    myChart.data.datasets[0].data = workouts_week_data[1][1];
  }
  else if (range_selector.value == "6 months") {
    myChart.data.labels = workouts_week_data[2][0];
    myChart.data.datasets[0].data = workouts_week_data[2][1];
  }
  else if (range_selector.value == "1 year") {
    myChart.data.labels = workouts_week_data[3][0];
    myChart.data.datasets[0].data = workouts_week_data[3][1];
  }
  else if (range_selector.value == "All time") {
    myChart.data.labels = workouts_week_data[4][0];
    myChart.data.datasets[0].data = workouts_week_data[4][1];
  }

  myChart.update();
}

function show_history(element, user_workout_hist) {
  $('#History_Modal').modal('toggle');

  workout = element.parentNode.parentNode.firstElementChild.firstElementChild.value;

  $(".modal-title").text(workout);

  user_hist_index = 0;
  for (i = 0; i < user_workout_hist.length; i++) {
    if (user_workout_hist[i][1] == workout) {
      user_hist_index = i;
    }
  }

  $("#modal_list").empty();
  for (i = 0; i < user_workout_hist[user_hist_index][2].length; i++) {
    let li = document.createElement('li');
    let div = document.createElement('div');
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');
    let hr = document.createElement('hr');

    div.style = 'float:left;';
    span1.style = 'float:right; background-color: transparent; color: #5c677d;';
    span2.style = 'float:right; background-color: transparent; color: #5c677d;';
    span3.style = 'float:right; background-color: transparent; color: #5c677d;';
    span1.className = 'badge';
    span2.className = 'badge';
    span3.className = 'badge';

    div.innerHTML += user_workout_hist[user_hist_index][2][i][0];

    span1.innerHTML += user_workout_hist[user_hist_index][2][i][1] + " x " + user_workout_hist[user_hist_index][2][i][2];
    if (user_workout_hist[user_hist_index][2][i][3] != "None") {
      span1.innerHTML += " x " + user_workout_hist[user_hist_index][2][i][3];
    }
    span2.innerHTML += "distance: " + user_workout_hist[user_hist_index][2][i][4] + " miles";
    span3.innerHTML += "duration: " + user_workout_hist[user_hist_index][2][i][5];


    li.appendChild(div);

    if (user_workout_hist[user_hist_index][2][i][1] != "None") {
      li.appendChild(span1);
    }
    else {
      li.appendChild(span2);
      if (user_workout_hist[user_hist_index][2][i][3] != "None") {
        li.appendChild(span3);
      }
    }

    document.getElementById("modal_list").appendChild(hr);
    document.getElementById("modal_list").appendChild(li);
  }
}

function validateForm(lift_array, cardio_array)
{
  var i;
  for (i = 0; i < document.getElementById("rowcontainer").childElementCount; i++) {
    cardio_test = cardio_array.includes(document.getElementById("exercise_selector_" + i).value);

    if (document.getElementById("exercise_selector_" + i).value === "Add new...")
    {
      if (document.getElementById("new_exc_name_" + i).value === "")
      {
        alert("You must name all new exercises");
        document.getElementById("new_exc_name_" + i).style.borderColor = "#FF0000";
        return false;
      }
      if (document.getElementById("new_exc_mg_selector_" + i).value === "")
      {
        alert("You must select a muscle group for new exercises");
        document.getElementById("new_exc_mg_selector_" + i).style.borderColor = "#FF0000";
        return false;
      }
      else if (document.getElementById("new_exc_mg_selector_" + i).value === "Cardio")
      {
        if (document.getElementById("miles_" + i).value === "")
        {
          alert("Please enter a distance for your '" + document.getElementById("new_exc_name_" + i).value + "' exercise");
          document.getElementById("miles_" + i).style.borderColor = "#FF0000";
          return false;
        }
      }
      else
      {
        if ((document.getElementById("sets_" + i).value === "") && (document.getElementById("reps_" + i).value === ""))
        {
          alert("Please enter the number of sets and repetitions for your '" + document.getElementById("new_exc_name_" + i).value + "' exercise");
          document.getElementById("sets_" + i).style.borderColor = "#FF0000";
          document.getElementById("reps_" + i).style.borderColor = "#FF0000";
          return false;
        }

        if (document.getElementById("sets_" + i).value === "")
        {
          alert("Please enter the number of sets for your '" + document.getElementById("new_exc_name_" + i).value + "' exercise");
          document.getElementById("sets_" + i).style.borderColor = "#FF0000";
          return false;
        }

        if (document.getElementById("reps_" + i).value === "")
        {
          alert("Please enter the number of repetitions for your '" + document.getElementById("new_exc_name_" + i).value + "' exercise");
          document.getElementById("sets_" + i).style.borderColor = "#FF0000";
          return false;
        }
      }
    }
    else if (cardio_test)
    {
      if (document.getElementById("miles_" + i).value === "")
      {
        alert("Please enter a distance for your '" + document.getElementById("exercise_selector_" + i).value + "' exercise");
        document.getElementById("miles_" + i).style.borderColor = "#FF0000";
        return false;
      }
    }
    else if (document.getElementById("exercise_selector_" + i).value === "")
    {
      document.getElementById("exc_row_" + i).remove();
    }
    else
    {
      if ((document.getElementById("sets_" + i).value === "") && (document.getElementById("reps_" + i).value === ""))
      {
        alert("Please enter the number of sets and repetitions for your '" + document.getElementById("exercise_selector_" + i).value + "' exercise");
        document.getElementById("sets_" + i).style.borderColor = "#FF0000";
        document.getElementById("reps_" + i).style.borderColor = "#FF0000";
        return false;
      }

      if (document.getElementById("sets_" + i).value === "")
      {
        alert("Please enter the number of sets for your '" + document.getElementById("exercise_selector_" + i).value + "' exercise");
        document.getElementById("sets_" + i).style.borderColor = "#FF0000";
        return false;
      }

      if (document.getElementById("reps_" + i).value === "")
      {
        alert("Please enter the number of repetitions for your '" + document.getElementById("exercise_selector_" + i).value + "' exercise");
        document.getElementById("sets_" + i).style.borderColor = "#FF0000";
        return false;
      }
    }
  }
}

function new_exc_field_viewer(element)
{
  var this_lift_div = element.parentNode.parentNode.children[2];
  var this_cardio_div = element.parentNode.parentNode.children[3];
  var this_buttons_div = element.parentNode.parentNode.children[4];
  var this_hist_button = element.parentNode.parentNode.lastElementChild.lastElementChild;

  if (element.value === "Cardio")
  {
    this_lift_div.style.display = "none";
    this_cardio_div.style.display = "flex";
  }
  else
  {
    this_lift_div.style.display = "flex";
    this_cardio_div.style.display = "none";
  }
  this_buttons_div.style.display = "flex";
  this_hist_button.style.display = "none";
}

function add_exercise()
{
  let last_exc_div_index = document.getElementById("rowcontainer").lastElementChild.id.match(/\d+/);
  let nextindex = parseInt(last_exc_div_index,10) + 1;

  let exercise_row = document.querySelector('#exc_row_0');
  let cloned_exercise_row = exercise_row.cloneNode(true);

  //assigning unique id's to newly created divs
  cloned_exercise_row.id = "exc_row_" + nextindex;
  cloned_exercise_row.firstElementChild.firstElementChild.id = "exercise_selector_" + nextindex;
  cloned_exercise_row.firstElementChild.nextElementSibling.id = "new_exc_div_" + nextindex;    //new exc div
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.id = "lift_div_" + nextindex;     //lift_div
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.id = "cardio_div_" + nextindex;      //cardio_div
  cloned_exercise_row.lastElementChild.id = "buttons_div_" + nextindex;  //buttons_div

  //assigning unique id's to newly created inputs
  cloned_exercise_row.firstElementChild.nextElementSibling.firstElementChild.id = "new_exc_name_" + nextindex;  //new exc name
  cloned_exercise_row.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.id = "new_exc_mg_selector_" + nextindex;  //new exc mg selector
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.id = "sets_" + nextindex; //sets
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.id = "reps_" + nextindex; //reps
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.id = "resistance_" + nextindex; //resistance
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.id = "miles_" + nextindex; //distance
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.id = "hours_" + nextindex; //hours
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.id = "minutes_" + nextindex; //minutes
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.id = "seconds_" + nextindex; //seconds

  //assigning unique names to newly created divs
  cloned_exercise_row.id = "exc_row_" + nextindex;
  cloned_exercise_row.firstElementChild.firstElementChild.name = "exercise_selector_" + nextindex;
  cloned_exercise_row.firstElementChild.nextElementSibling.name = "new_exc_div_" + nextindex;    //new exc div
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.name = "lift_div_" + nextindex;     //lift_div
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.name = "cardio_div_" + nextindex;      //cardio_div
  cloned_exercise_row.lastElementChild.name = "buttons_div_" + nextindex;  //buttons_div

  //assigning unique names to newly created inputs
  cloned_exercise_row.firstElementChild.nextElementSibling.firstElementChild.name = "new_exc_name_" + nextindex;  //new exc name
  cloned_exercise_row.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.name = "new_exc_mg_selector_" + nextindex;  //new exc mg selector
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.name = "sets_" + nextindex; //sets
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.name = "reps_" + nextindex; //reps
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.name = "resistance_" + nextindex; //resistance
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.name = "miles_" + nextindex; //distance
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.name = "hours_" + nextindex; //hours
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.name = "minutes_" + nextindex; //minutes
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.name = "seconds_" + nextindex; //seconds

  //resetting style of newly created divs
  cloned_exercise_row.firstElementChild.nextElementSibling.style.display = "none";    //new exc div
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.style.display = "none";     //lift_div
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "none";      //cardio_div
  cloned_exercise_row.lastElementChild.style.display = "none";  //buttons_div

  //resetting values of newly created input fields
  cloned_exercise_row.firstElementChild.nextElementSibling.firstElementChild.value = '';  //new exc name
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.value = ''; //sets
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.value = ''; //reps
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value = ''; //resistance
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.value = ''; //distance
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value = ''; //hours
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value = ''; //minutes
  cloned_exercise_row.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value = ''; //seconds

  document.querySelector('#rowcontainer').appendChild(cloned_exercise_row);
}

function remove_exercise(element)
{
  if (element.parentNode.parentNode.parentNode.children.length === 1)
  {
    element.parentNode.parentNode.firstElementChild.nextElementSibling.style.display = "none";    //new exc div
    element.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.style.display = "none";     //lift_div
    element.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "none";      //cardio_div
    element.parentNode.parentNode.lastElementChild.style.display = "none";  //buttons_div

    element.parentNode.parentNode.firstElementChild.nextElementSibling.firstElementChild.value = '';  //new exc name
    element.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.value = ''; //sets
    element.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.value = ''; //reps
    element.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value = ''; //resistance
    element.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.value = ''; //distance
    element.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value = ''; //hours
    element.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value = ''; //minutes
    element.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.value = ''; //minutes
  }
  else
  {
    element.parentNode.parentNode.remove();
  }
}