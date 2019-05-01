var first=document.getElementById("get_words");
first.addEventListener("submit", async function(event){
  event.preventDefault();
  try{
    let number =document.getElementById("number").value;
    let codeword =document.getElementById("codeword").value;

    let response=await fetch("http://localhost:3000/words?number="+number,
                              {
                                method: "GET",
                              });
    if(response.ok){
      let body=await response.text();
      let wordsJSON=JSON.parse(body);

      try{
        document.getElementById("locations").innerHTML=
        `
        <h6 class="text-center">${wordsJSON.contents.quotes[0].date}</h6>
        <blockquote class="blockquote text-center"> ${wordsJSON.contents.quotes[0].quote}
        <footer class="blockquote-footer">${wordsJSON.contents.quotes[0].author}</footer>
        </blockquote>
        `;
      } catch(error){
        try{
          document.getElementById("locations").innerHTML=
          `<span><b> ${wordsJSON.error.message} </b></span>`;
        } catch(error) {
          alert("problem: "+error);
        }
      }
    } else {
      throw new Error("problem getting a response: "+response.code);
    }

    let response1=await fetch("http://localhost:3000/pics?codeword="+codeword,
                              {
                                method: "GET",
                              });
    if(response1.ok){
      let body3=await response1.text();
      let picsJSON=JSON.parse(body3);

      picsJSON.results.forEach((e) => {
            document.getElementById("pictures").innerHTML+=
            `<img src="${e.urls.thumb}" class="img-thumbnail float-left" alt="${e.id}" onclick="image(this)">`;
          });

      if (picsJSON.results.length==0){
        alert("No results for "+codeword+" have been found. Please try another theme!");
      }
    } else {
      throw new Error("problem getting a response: "+response1.code);
    }
  } catch(error) {
    alert("problem: "+error);
  }
});

async function image(img){
  try{
    var src=img.src;
    var id=img.alt;
    if (confirm("Do you want to save this picture?")){
      let response=await fetch("http://localhost:3000/save?links="+src+"&name="+id,
                                {
                                  method: "GET",
                                });
      if (!response.ok){
        throw new Error("problem getting a response: "+response.code);
      }
    } else{
      window.close();

    }
  } catch(error){
    alert("Error");
  }
}

document.getElementById("buttonP").addEventListener("click", async function(event){
    event.preventDefault();
    try{
      let response5=await fetch("http://localhost:3000/populate",
                                  {
                                    method: "GET",
                                  });
      if(response5.ok){
        let body5=await response5.text();
        let file=JSON.parse(body5);
        Object.values(file).forEach((e) =>{
            document.getElementById("secPage").innerHTML+=
            `<img src="${e}+&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjY3MDg1fQ" class="img-thumbnail float-left">`;
          });
        } else{
          alert("Error");
        }
    } catch(error){
      alert("error");
    }
  });

var second=document.getElementById("form-login");
second.addEventListener("submit", async function(event){
  event.preventDefault();
  try {
    let pass =document.getElementById("password").value;
    let theme =document.getElementById("theme").value;
    let text =document.getElementById("textID").value;


    let response=await fetch("http://localhost:3000/blog",
                              {
                                method: "POST",
                                headers: {
                                  "Content-type": "application/x-www-form-urlencoded"
                                },
                                body: "pass="+pass+"&theme="+theme+"&text="+text
                            });
    if(response.ok){
      let body=await response.text();
      let message=JSON.parse(body);
      if (!message.error_007){
        document.getElementById("undertext").innerHTML=
        "<h5>User's THOUGHTS</h5>";
        Object.values(message).forEach(e=>{
          document.getElementById("undertext").innerHTML+=
          `<p><mark>${e}</mark></p>`;
        });
      } else {
        alert(`${message.error_007}`);
      }
    } else {
      alert("response is not ok");
    }

  } catch (error) {
    alert("POST is not fetched");

  }

});
