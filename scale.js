
var getHwGrade= function(onehomework)
{
    return onehomework.grade;
}
var getHwMean= function(penguin)
{
    var grades=penguin.homework.map(getHwGrade)
    var HwMean=d3.mean(grades);
    return HwMean;
}
 
//final grades
var getFinal = function(penguin)
    {
    return penguin.final[0].grade
    }
//quiz mean

var getQuizgrade=function(onequiz)
{
    return onequiz.grade;
}
var getQuizMean=function(penguin)
    {
        var grades=penguin.quizes.map(getQuizgrade)
        var QuizMean=d3.mean(grades);
        return QuizMean;
    }


//plot graph
var drawPlot=function(penguins,screen,xScale,yScale)
             

{  
    d3.select("#graph1")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx",function(penguin)
     {
        console.log (xScale(getFinal(penguin)));
        return xScale(getFinal(penguin));
     })
     .attr("cy", function(penguin)
          {
            console.log (yScale(getHwMean(penguin)));   
            return yScale(getHwMean(penguin));
          }) 
    .attr("r",2)
    
     .on("mouseenter", function(penguin)
       {
        var xPos=d3.event.pageX;
        var yPos=d3.event.pageY;
        d3.select("#tooltip")
                .classed("hidden", false)
                .style("top",yPos+"px")
                .style("left",xPos+"px")
        d3.select("img")
        .attr("src", "imgs/" + penguin.picture)
        drawPlot(penguin,screen,xScale,yScale)
 })
}

var QuizButton = function(penguins,screen,xScale, yScale)
{
    console.log("click")
    d3.select("#banner")
    .on("click", function()
       {
        d3.selectAll("circle")
        .remove()
        drawHPlot(penguins,screen,xScale,yScale);
        drawQuizBanner()
        })
}

//draw graph1
var drawHWQmeanGraph = function(penguins,screen,xScale,yScale)
    {
        d3.select("#graph2")
            .selectAll("circle")
            .data(penguins)
            .enter()
            .append("circle")
            .attr("cx",function(penguin)
            {
                //console.log (xScale(getHwMean(penguin)));
                return xScale(getHwMean(penguin));
            })
           .attr("cy", function(penguin)
          {
            //console.log (yScale(getQuizMean(penguin)));
             return yScale(getQuizMean(penguin));
          }) 
            .attr("r",2)
        
        .on("mouseenter", function(penguin)
           {
            var xPos=d3.event.pageX;
            var yPos=d3.event.pageY;
            
                d3.select("#tooltip2")
                    .classed("hidden", false)
                    .style("top",yPos+"px")
                    .style("left",xPos+"px")
                d3.select("img")
                    .attr("src", "imgs/" + penguin.picture)
            
        })
    }


var button= function(penguins,screen, xScale, yScale)
{
    console.log("click")
    d3.select("#banner2")
        .on("click", function()
            {
            d3.selectAll("circle")
                .remove ()
            drawHWQmeanGraph(penguins,screen, xScale, yScale)
        drawBanner2();
            })
}

var drawBanner1= function()
    {
        d3.selectAll("h1")
            .text("Final vs Homework Mean")
    }

var drawBanner2=function()
    {
        d3.selectAll("h1")
        .text("Homework Mean vs Quiz Mean")
    }

//init graph for drawPlot-graph1
var initGraph1=function(penguins)
{
    var screen={width:500,height:500}
        d3.select("#graph1")
            .attr("width",screen.width)
            .attr("height",screen.height)
    var xScale=d3.scaleLinear()
        .domain([0,100])
        .range ([0,screen.width]);
    var yScale=d3.scaleLinear()
        .domain([0,100])
        .range([screen.height,0]);
    console.log("#graph1")

drawPlot(penguins,screen,xScale,yScale);
button(penguins,screen,xScale,yScale);
QuizButton(penguins,screen,xScale,yScale);
}

//initgraph 2
var initGraph2=function(penguins)
{
    var screen={width:500,height:500}
    
    d3.select("#graph2")
    .attr("width",screen.width)
    .attr("height",screen.height)
    

var xScale=d3.scaleLinear()
    .domain([0,100])
    .range([0,screen.width]);

var yScale=d3.scaleLinear()
    .domain([0,100])
    .range([screen.height,0])

drawHWQmeanGraph (penguins,screen,xScale, yScale);
button(penguins,screen,xScale,yScale);
QuizButton(penguins,screen,xScale,yScale);
}


//promise
var penguinPromise=d3.json("classData.json")

var succFCN=function(penguins)
{

    console.log("penguins",penguins);
    getHwMean (penguins[0]);
    getFinal (penguins[0]);
    getQuizMean(penguins[0]);
    initGraph1 (penguins);
    initGraph2 (penguins);
}

var failFCN=function(penguin)
{
    console.error("did not find the file", err);
    setBanner("This did not work hehe!")
}

var penguinPromise= penguinPromise.then(succFCN, failFCN);
    
    