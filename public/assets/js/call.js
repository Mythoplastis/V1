function call(){
        var response = document.getElementById('category').value;
        if (response=="Texts") {document.getElementById("Text").style.display='block';} else {
        document.getElementById("Text").style.display='none';
        };
        if (response=="Video") {document.getElementById(response).style.display='block';} else {
        document.getElementById("Video").style.display='none';
        };
        if (response=="Pictures") {document.getElementById(response).style.display='block';} else {
        document.getElementById("Pictures").style.display='none';
        };
        if (response=="Sound") {document.getElementById(response).style.display='block';} else {
        document.getElementById("Sound").style.display='none';
        };
        if (response=="NA") {document.getElementById("textBut").style.display='none';} else {
        document.getElementById("textBut").style.display='block';
        };
        if (response=="NA") {document.getElementById("feeling").style.display='none';} else {
        document.getElementById("feeling").style.display='block';
        };
        if (response=="NA") {document.getElementById("hashtag").style.display='none';} else {
        document.getElementById("hashtag").style.display='block';
        };
        if (response=="NA") {document.getElementById("textarea").style.display='none';} else {
        document.getElementById("textarea").style.display='block';
        };
        }