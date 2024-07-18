window.onload = start;



function start()
{
    const  target = document.getElementById("piece1");
    console.log('1111111');
    console.log(target);
    console.log('1111111');
    console.log(target.innerHTML);
    
    if(target.innerHTML=="x")
    {
        target.className = "cross";
        target.innerHTML= "x";
    }
    else
    {
        target.className = "circle";
        target.innerHTML= "o";
    }
    
    
}
