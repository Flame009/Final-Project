const server = 'http://localhost:3000';

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

async function fetchResponses() {
    const url = server + '/responses';
    const options = {
        method: 'GET',
        headers: {
            'Accept' : 'application/json'
        }
    }
    const response = await fetch(url, options);
    const responses = await response.json();
    //console.log(responses[0])
    //populateContent(responses);
    drawChart(responses);
}

async function addResponses(responses) {
    const url = server + '/responses';
   // console.log(responses)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(responses)
    }
    const response = await fetch(url, options);
}

function reset(){
    document.getElementById("technologies").checked=false
    document.getElementById("skills").checked=false
    document.getElementById("food").checked=false
    document.getElementById("accommodation").checked=false
    document.getElementById("trainers").checked=false
    document.getElementById("fellow_students").checked=false
    document.getElementById("nothing").checked=false
}


function drawChart(responses) {
    technologies=responses[0].technologies
    skills=responses[0].skills
    food=responses[0].food
    accommodation=responses[0].accommodation
    trainers=responses[0].trainers
    fellow_students =responses[0].fellow_students
    nothing=responses[0].nothing
    var  count=(technologies+skills+food+accommodation+fellow_students+nothing)
    var students=responses[0].students
    console.log(count)
    tech_pie=(100*technologies)/count
    skill_pie=(100*skills)/count
    food_pie=(100*food)/count
    accommodation_pie=(100*accommodation)/count
    trainers_pie=(100*trainers)/count
    fellow_students_pie=(100*fellow_students)/count
    nothing_pie=(100*nothing)/count
    

    var data = google.visualization.arrayToDataTable([
      ['Contry', 'Mhl'],
      ['Technology',parseInt(tech_pie)],
      ['Nothing',parseInt(nothing_pie)],
      ['food and Drinks',parseInt(food_pie)],
      ['Accomodation',parseInt(accommodation_pie)],
      ['Trainers',parseInt(trainers_pie)],
      ['Fellow Students',parseInt(fellow_students_pie)],
      ['skills',parseInt(skill_pie)]

    ]);
    
    var options = {
      title:'What students liked about the bootcamp\n\n Total Responses: '+count+'\n\n From '+students+' Students ',
      is3D:true,
      slices: {1: {offset: 0.2},            
          },
      animation:{"startup":true,
                 duration: 1000,
                 easing: 'linear',
                }
    };
    
    var chart = new google.visualization.PieChart(document.getElementById('myChart'));
      chart.draw(data, options);

    document.getElementById('numbers').innerHTML = "count";

}


function disable(){
        var te=document.getElementById("technologies")
        var sk=document.getElementById("skills")
        var fo=document.getElementById("food")
        var ac=document.getElementById("accommodation")
        var tr=document.getElementById("trainers")
        var fe=document.getElementById("fellow_students")
        var no=document.getElementById("nothing")
    if (te.checked==true||sk.checked==true||fo.checked==true||ac.checked==true||tr.checked==true||fe.checked==true)
    {
        document.getElementById("nothing").disabled=true
    }else{
        document.getElementById("nothing").disabled=false
    
        }
    if(no.checked==true){
        te.disabled=true
        sk.disabled=true
        fo.disabled=true
        ac.disabled=true
        tr.disabled=true
        fe.disabled=true
    }
    
    if(no.checked==false){
        te.disabled=false
        sk.disabled=false
        fo.disabled=false
        ac.disabled=false
        tr.disabled=false
        fe.disabled=false
    }
    


}

function myFunction() {
    
    var technologies=document.getElementById("technologies").checked ? 1:0
    var  skills=document.getElementById("skills").checked ? 1:0
    var food=document.getElementById("food").checked ? 1:0
    var accommodation=document.getElementById("accommodation").checked ? 1:0
    var trainers=document.getElementById("trainers").checked? 1:0
    var fellow_students=document.getElementById("fellow_students").checked? 1:0
    var nothing=document.getElementById("nothing").checked? 1:0
    var students=1
    
    if(technologies==1 ||skills==1 ||food==1 ||accommodation==1 ||trainers==1 ||fellow_students==1)
        {
            nothing=0;
        }
    if(technologies==0 && skills==0 && food==0 &&accommodation==0 &&trainers==0 &&fellow_students==0&& nothing==0)
        {
            alert('You have to choose at least one response to submit!!')
            window.reload()
        }
        
    var responses = [{ "technologies": technologies,
                      "skills": skills,
                      "food": food,
                      "accommodation": accommodation,
                      "trainers": trainers,
                      "fellow_students": fellow_students, 
                      "nothing": nothing,
                      "students": students,
                    }]
     
        addResponses(responses);
        fetchResponses();

        document.getElementById("on-submit").style.display = "none"; 
        document.getElementById("myChart").style.height="100vh";  
        alert('Your response has  been submitted') 
        
};
