//periode
function periodeToName(periode){
	return window.monthName["ID"][periode.substr(4,2)] +" "+periode.substr(0,4);
}
function nextNPeriode(periode, n) 
{
	var bln = parseFloat(periode.substr(4,2));
	var thn = parseFloat(periode.substr(0,4));
	for (var i = 1; i <= n;i++){
		if (bln < 12) bln++;
		else {
			bln = 1;
			thn++;
		}
	}
	if (bln < 10) bln = "0" + bln;
	return thn+""+bln;
};
function getPrevPeriode(periode) 
{
	var bln = parseFloat(periode.substr(4,2));
	var thn = parseFloat(periode.substr(0,4));
	if (bln == 1) {
		bln = 12;
		thn--;
	}else bln--;
	if (bln < 10) bln = "0" + bln;
	return thn+""+bln;
};
function getNextPeriode(periode) 
{
	var bln = parseFloat(periode.substr(4,2));
	var thn = parseFloat(periode.substr(0,4));
	if (bln == 12 ) {
		bln = 1;
		thn++;
	}else bln++;
	if (bln < 10) bln = "0" + bln;
	return thn+""+bln;
};
function closePeriode(periode, maksPeriode)
{
	var bln = parseFloat(periode.substr(4,2));
	var thn = parseFloat(periode.substr(0,4));
	if (bln < 0 || bln > 99) bln = 1;	
	if (bln == maksPeriode ) {
		bln = 1;
		thn++;
	}else bln++;
	if (bln < 10) bln = "0" + bln;
	return thn+""+bln;
};
