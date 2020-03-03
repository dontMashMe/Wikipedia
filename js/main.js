var clanakArr = [];
var ranItems = [];
kat.on('value', function(a) {
    a.forEach(function(snapshot){
        var kkey = snapshot.key; 
        snapshot.forEach(function(snapshotItem) {
            var key = snapshotItem.key; 
            var val = snapshotItem.val();
            if(kkey!= "WikiPravila" && key.length<18 && val.visible == true)
            {
                var oClanak = 
                {
                    mKate : kkey, 
                    mClanak : key              
                }
                console.log(oClanak);
                clanakArr.push(oClanak);
            }
        })
    })
    while(ranItems.length <= 9)
    {
        var item = clanakArr[Math.floor(Math.random()*clanakArr.length)];
        if(!ranItems.includes(item))
        {
            ranItems.push(item);
        }
    }    
    for(var i=0; i < ranItems.length;i++)
    {
        if(i < 3)
        {
            $('#left').append('<li><a href="clanak.html?kategorija_key='+ranItems[i].mKate+'&clanak='+ranItems[i].mClanak +'">' + ranItems[i].mClanak+'</a></li>');
        }
        if(i >= 3 && i < 6)
        {
            $('#middle').append('<li><a href="clanak.html?kategorija_key='+ranItems[i].mKate+'&clanak='+ranItems[i].mClanak +'">' + ranItems[i].mClanak+'</a></li>');
        }
        if(i > 6)
        {
            $('#right').append('<li><a href="clanak.html?kategorija_key='+ranItems[i].mKate+'&clanak='+ranItems[i].mClanak +'">' + ranItems[i].mClanak+'</a></li>');
        }
    }
})

