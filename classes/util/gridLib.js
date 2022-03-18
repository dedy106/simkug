//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.util_gridLib = function(){
	window.util_gridLib.prototype.parent.constructor.call(this);
	this.className = "util_gridLib";
};
window.util_gridLib.extend(window.Function);
window.util_gridLib.prototype.SGAppendData = function(SG,Column,ColumnData){
  try{
      if (ColumnData.length != Column.length) 
      {
      	window.page.alert(undefined,"Programmer Error. Banyak ColumnData dan Column tidak sama !!","contact your programmer"); 
      	return false;
      }
      var Valid = true;
      for (var i = 0;i <Column.lenght;i++)
      {
        if (ColumnData[i] == "") Valid = false;
      }
    
      if (Valid)
      {
        Valid=true;i=0;
        for (var i=0;i<SG.rowCount-1;i++)
        {
            if (SG.getCell(0,i)=="")
            {
               Valid=false;
               break;
            }
        }
        if (Valid)
        {
        SG.appendRow();
        i=SG.rowCount-1;
        }//alert(Valid);
        for (var j = 0 ;j < Column.length;j++)
        {
          if (ColumnData[j] != undefined)
            SG.setCell(Column[j],i,ColumnData[j]);
          else SG.setCell(Column[j],i,"");
          
        }        
      }
  }catch(e)
  {
     alert(e);
  }
};
window.util_gridLib.prototype.SGHitungRowValid = function(SG){
};
window.util_gridLib.prototype.SGInsertLast = function(SG, Column,ColumnData){
};
window.util_gridLib.prototype.SGEditData = function(SG,ARow,Column,ColumnData){
  if (ColumnData.length != Column.length )
  {
	  window.page.alert(undefined,'Programmer Error. Banyak ColumnData dan Column tidak sama !!',"contact your programmer"); 
	  return false;
  }
	for (var i = 0;i < Column.length;i++)
      SG.setCell(Column[i],ARow,ColumnData[i]);
};
window.util_gridLib.prototype.SGTukarRow = function(SG,Row1, Row2){
};
window.util_gridLib.prototype.SGAllRowValid = function(SG){
};
window.util_gridLib.prototype.SGIsiItemsFromArray = function(items, array){
	items.clear();
	for (var i = 0; i < array.length;i++)
	{
		items.set(i, array[i]);
	}	
};