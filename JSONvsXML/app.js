$( document ).ready(function() {
    
    var log = function(msg)
    {
        $("#logpanel").append(msg + "<br/>");
        console.log(msg);
    };
    
    var x2js = new X2JS();
    
    var xmlStart;
    var xmlEnd;
    var jsonStart;
    var jsonEnd;
    
    var convertStart;
    var convertEnd;
    
    var jsonFromXml;
    var jsonFromJson;
    
    $.when()
    .then(function(){
        xmlStart = performance.now(); 
        return $.Deferred().resolve();})
    .then(function(){return $.get( "Response.xml")})
    .then(function(data){
        
        convertStart = performance.now();
        jsonFromXml = x2js.xml2json( data );
        convertEnd = performance.now();
        
        xmlEnd = performance.now();
        return $.Deferred().resolve();
    })
    .then(function(){
        jsonStart = performance.now(); 
        return $.Deferred().resolve();})
    .then(function(){return $.get( "Response.json")})
    .then(function( data2 ) {
        jsonFromJson = data2;
        jsonEnd = performance.now();
        return $.Deferred().resolve();        
    })
    .then(function(){
        log('XML:  ' + (xmlEnd - xmlStart) + ' ms.');
        log('  --> davon Konvertierung:  ' + (convertEnd - convertStart) + ' ms.');
        log('JSON:  ' + (jsonEnd - jsonStart) + ' ms.');
        
        console.log(jsonFromXml);
        console.log(jsonFromJson);
    });
});
