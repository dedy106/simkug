//---------------------- Date Extended
//*********************************************************
window.dateTimeFormat = "dd/mm/yyyy";
window.dayName = ["Sun","Mon","Tue","Wed","Thu","Fry","Sat"];
window.dayLocal = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
window.monthName = [];
window.monthName["EN"] = [];
window.monthName["ID"] = [];
window.monthName["EN"]["01"] = "January";
window.monthName["EN"]["02"] = "Febuary";
window.monthName["EN"]["03"] = "March";
window.monthName["EN"]["04"] = "April";
window.monthName["EN"]["05"] = "May";
window.monthName["EN"]["06"] = "June";
window.monthName["EN"]["07"] = "July";
window.monthName["EN"]["08"] = "Augustus";
window.monthName["EN"]["09"] = "September";
window.monthName["EN"]["10"] = "October";
window.monthName["EN"]["11"] = "November";
window.monthName["EN"]["12"] = "December";
window.monthName["ID"]["01"] = "Januari";
window.monthName["ID"]["02"] = "Febuari";
window.monthName["ID"]["03"] = "Maret";
window.monthName["ID"]["04"] = "April";
window.monthName["ID"]["05"] = "Mei";
window.monthName["ID"]["06"] = "Juni";
window.monthName["ID"]["07"] = "Juli";
window.monthName["ID"]["08"] = "Agustus";
window.monthName["ID"]["09"] = "September";
window.monthName["ID"]["10"] = "Oktober";
window.monthName["ID"]["11"] = "Nopember";
window.monthName["ID"]["12"] = "Desember";

function ubahPeriode(periode){	
	return monthName["ID"][periode.substr(4)] +" "+periode.substr(0,4);
}
Date.prototype.DateAdd = function (timeU,byMany,dateObj) {
	var millisecond=1;
	var second=millisecond*1000;
	var minute=second*60;
	var hour=minute*60;
	var day=hour*24;
	var year=day*365;
  //542278
	var newDate;
	var dVal=this.valueOf();
	switch(timeU) {
		case "ms": newDate=new Date(dVal+millisecond*byMany); break;
		case "s": newDate=new Date(dVal+second*byMany); break;
		case "mi": newDate=new Date(dVal+minute*byMany); break;
		case "h": newDate=new Date(dVal+hour*byMany); break;
		case "d": newDate=new Date(dVal+day*byMany); break;
		case "y": newDate=new Date(dVal+year*byMany); break;
	}
	return newDate;
};
Date.prototype.DateSub = function (timeU,byMany,dateObj) {
	var millisecond=1;
	var second=millisecond*1000;
	var minute=second*60;
	var hour=minute*60;
	var day=hour*24;
	var year=day*365;
  //542278
	var newDate;
	var dVal=this.valueOf();
	switch(timeU) {
		case "ms": newDate=new Date(dVal-millisecond*byMany); break;
		case "s": newDate=new Date(dVal-second*byMany); break;
		case "mi": newDate=new Date(dVal-minute*byMany); break;
		case "h": newDate=new Date(dVal-hour*byMany); break;
		case "d": newDate=new Date(dVal-day*byMany); break;
		case "y": newDate=new Date(dVal-year*byMany); break;
	}
	return newDate;
};
Date.prototype.getBln = function() {		
	return this.getMonth() + 1;
};
function dayToYear(day){		
	var y = Math.floor( day / 365);//390 - 365 = 25
	var s = day % 365;
	var m = Math.floor( s / 30);
	s = s % 30;
	return [y, m, s];
};
Date.prototype.DateDiff = function(dateObj){
  var ret = (this - dateObj) / (24*60*60*1000);
  return ret;
};
Date.prototype.getDateStr = function(){
	return this.getFullYear()+"-"+(this.getBln() < 10? "0"+this.getBln(): this.getBln())+"-"+(this.getDate() < 10? "0"+this.getDate(): this.getDate());
};
Date.prototype.getDateTimeStr = function(nminute){
	var d = this.DateSub("mi",nminute);
	return d.getFullYear()+"-"+(d.getBln() < 10? "0"+d.getBln(): d.getBln())+"-"+(d.getDate() < 10? "0"+d.getDate(): d.getDate()) +
		d.getHours() +":"+d.getMinutes()+":"+d.getSeconds();
	
};
Date.prototype.idFormat = function(strDate){
	var d = this.strToDate(strDate);
	return (d.getDate() < 10? "0"+d.getDate(): d.getDate())+"/"+(d.getBln() < 10? "0"+d.getBln(): d.getBln())+"/"+d.getFullYear();
};
Date.prototype.lclFormat = function(){
	var d = this;
	return (d.getDate() < 10? "0"+d.getDate(): d.getDate())+"/"+(d.getBln() < 10? "0"+d.getBln(): d.getBln())+"/"+d.getFullYear();
};
Date.prototype.lclFullFormat = function(){
	var d = this;
	return (d.getDate() < 10? "0"+d.getDate(): d.getDate())+"/"+(d.getBln() < 10? "0"+d.getBln(): d.getBln())+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
};
Date.prototype.getThnBln = function(){
	var d = this;
	return d.getFullYear() + (d.getBln() < 10? "0"+d.getBln(): d.getBln());
};
Date.prototype.strToDate = function(strDate){
	if (strDate == undefined) strDate = "1900-01-01";
  if (strDate.search("/") != -1)
  {
	//20/01/2008
	var d = strDate.split("/");
	var ret = new Date(parseInt(d[2],10),parseInt(d[1],10) - 1,parseInt(d[0],10));	
  }else 
  {
	//2008-01-20
	var d = strDate.split("-");
	if (d[0].length == 4)
		var ret = new Date(parseInt(d[0],10),parseInt(d[1],10) - 1,parseInt(d[2],10));	
	else var ret = new Date(parseInt(d[2],10),parseInt(d[1],10) - 1,parseInt(d[0],10));	
  }	  
  return ret;
};
Date.prototype.sqlDateStr = function(strDate){
	if (strDate == undefined) strDate = "1900-01-01";
  if (strDate.search("/") != -1)
  {
	//20/01/2008
	var d = strDate.split("/");
	var ret = parseInt(d[2],10)+"-"+parseInt(d[1],10)+"-"+parseInt(d[0],10);	
  }	  
  return ret;
};

Date.prototype.getWeek = function() {
	var onejan = new Date(this.getFullYear(),0,1);
	return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
} 

Date.prototype.weekOfMonth = function() {	
	var prefixes = [1, 2, 3, 4, 5];	
    return (monthName["ID"][(this.getMonth() + 1 < 10 ? "0": "")+(this.getMonth() + 1).toString()]).substr(0,3) +"-"+ prefixes[0 | this.getDate() / 7];

}
