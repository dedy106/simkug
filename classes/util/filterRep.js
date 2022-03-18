//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.util_filterRep = function(){
	window.util_filterRep.prototype.parent.constructor.call(this);
	this.className = "util_filterRep";
};
window.util_filterRep.extend(window.Function);
window.util_filterRep.implement({
	setSGFilterRowTipe: function(sg, aRow, listRow, listType){
		try{
			var s = "";
			for (var i = 0; i < listRow.length; i++)
			{
				if (aRow == listRow[i])
				{
					sg.columns.get(1).pickList.clear();
					s = listType[i];
					for (var j = 0; j < s.length;j++)
					{
						if (s.charAt(j) == '1' ) sg.columns.get(1).pickList.set(1,"All");
						if (s.charAt(j) == '2' ) sg.columns.get(1).pickList.set(2,"Range");
						if (s.charAt(j) == '3' ) sg.columns.get(1).pickList.set(3,"=");
						if (s.charAt(j) == '4' ) sg.columns.get(1).pickList.set(4,"None");
						if (s.charAt(j) == '5' ) sg.columns.get(1).pickList.set(5,"Like");
						if (s.charAt(j) == '6' ) sg.columns.get(1).pickList.set(6,"<=");
						if (s.charAt(j) == '7' ) sg.columns.get(1).pickList.set(7,"<>");
						if (s.charAt(j) == '8' ) sg.columns.get(1).pickList.set(8,"<");
						if (s.charAt(j) == '9' ) sg.columns.get(1).pickList.set(9,">=");
						if (s.charAt(j) == 'i') {
							sg.columns.get(1).pickList.set(10, "in");
							//sg.columns.get(2).setReadOnly(true);
							//sg.columns.get(3).setReadOnly(true);
						}
					}
				}
			}
		}catch(e)	{
			alert("[filterRep]::setSGFilterRowType:"+e);
		}	
	},
	filterStr: function(filterFieldName, filterTipe, filterData1, filterData2, filterAddStr){
	  var s = "";
	  if (filterData1 == "" ) filterData1 = ""; if (filterData2 == "" ) filterData2 = "";
	  if (filterTipe == "=" ) s = "(" + filterFieldName + " = '" + filterData1 + "')";
	  if (filterTipe == "<=" ) s = "(" + filterFieldName + " <= '" + filterData1 + "')";
	  if (filterTipe == ">=" ) s = "(" + filterFieldName + " >= '" + filterData1 + "')";
	  if (filterTipe == "<" ) s = "(" + filterFieldName + "  < '" + filterData1 + "')";
	  if (filterTipe == "<>" ) s = "(" + filterFieldName + " <> '" + filterData1 + "')";
	  if (filterTipe == "Like" ) s = "(" + filterFieldName + " Like '" + filterData1 + "%')";
	  if (filterTipe == "All" ) s = "(" + filterFieldName + " LIKE '%" + "')";
	  if (filterTipe == "Range" ) s = "(" + filterFieldName + " BETWEEN '" + filterData1 + "' AND '" + filterData2 + "')";
	  if (filterTipe == "in" ) {		  
		  var data =[];		  
		  var filterData1 = filterData1.split(",");
		  for (var i in filterData1){				  
				data[data.length] =  "'"+filterData1[i]+"'";
		  }		  
		  s = "(" + filterFieldName + " in (" + data +") )";		  
	  }

	  if (s != "" ) s = filterAddStr + s;
	  return s;
	},
	validasiType: function(SG, ARow){ 
		for (var i = 1; i < SG.getRowCount();i++)
		{
			if (SG.getCell(1,i) == "All" ) { SG.setCell(2,i,""); SG.setCell(3,i, ""); }
			if (SG.getCell(1,i) == "None" ) { SG.setCell(2,i,""); SG.setCell(3,i,"");}
			if (SG.getCell(1,i) == "Like" ) { SG.setCell(3,i,"");}
			if (SG.getCell(1,i) == '=')
			{		  
			  if (i == ARow ) 
				if (SG.columns.get(2).pickList.Count > 0) SG.setCell(2,i,SG.columns.get(2).pickList.get(0));		  
			}
			if (SG.getCell(1,i) == "Range" )
			{
			  if ((SG.getCell(2,i) == "") && (SG.columns.get(2).pickList.getLength() > 0)) 
			  	SG.setCell(2,i,SG.columns.get(2).pickList.get(0));
			  if (SG.getCell(3,i) == "") SG.setCell(3,i,SG.getCell(2,i));
			}
		}
	},
	setSGFilterRowButtonStyle: function(SG, ARow, listRow, listButtonStyle){
	  for (var i = 0;i < listRow.length; i++) 
	  {
	    if ( ARow == listRow[i] )
	    {
		  SG.columns.get(2).setReadOnly(false); SG.columns.get(3).setReadOnly(false);
	      switch (parseInt(listButtonStyle[i]))
		  {
	        case 0 : SG.columns.get(2).setButtonStyle(window.bsAuto); SG.columns.get(3).setButtonStyle(window.bsAuto); break;
	        case 1 : SG.columns.get(2).setButtonStyle(window.bsDate); SG.columns.get(3).setButtonStyle(window.bsDate); break;
	        case 2 : SG.columns.get(2).setButtonStyle(window.bsEllips); SG.columns.get(3).setButtonStyle(window.bsEllips); break;
	        case 3 : SG.columns.get(2).setButtonStyle(window.bsNone); SG.columns.get(3).setButtonStyle(window.bsNone); 
					SG.columns.get(2).setReadOnly(true); SG.columns.get(3).setReadOnly(true); break;
	        case 4 : SG.columns.get(2).setButtonStyle(window.bsNone); SG.columns.get(3).setButtonStyle(window.bsNone); break;
	        case 5 : SG.columns.get(2).setButtonStyle(window.bsNone); SG.columns.get(3).setButtonStyle(window.bsNone); break;			
		  }
		}
	  }
	  if (SG.getCell(1,ARow) == "All") {SG.columns.get(2).setButtonStyle(window.bsNone); SG.columns.get(3).setButtonStyle(window.bsNone); }
	  if (SG.getCell(1,ARow) == "=" ) {SG.columns.get(3).setButtonStyle(window.bsNone);}
	  if (SG.getCell(1,ARow) == "None") {SG.columns.get(2).setButtonStyle(window.bsNone); SG.columns.get(3).setButtonStyle(window.bsNone);}
	},
	ListDataSGFilter: function(FormRequester, caption, requester, row, col,sql, sql2, fields, operator,labels, withBlank, multiSelection){
	
		try
		{
			if (multiSelection){
				if (system.activeApplication.fMultipleSelection === undefined) 
				{
					uses("system_fSelectOptions");
					system.activeApplication.fMultipleSelection = new system_fSelectOptions(system.activeApplication);					
					
				}
								
				
				system.activeApplication.fMultipleSelection.setCaption(caption);
				system.activeApplication.fMultipleSelection.setRequester(FormRequester, requester, row,col,true);		
				system.activeApplication.fMultipleSelection.setScriptSql(sql, sql2);
				system.activeApplication.fMultipleSelection.setFields(fields, operator);
				system.activeApplication.fMultipleSelection.setLabels(labels);
				system.activeApplication.fMultipleSelection.showForm(withBlank);				
				system.activeApplication.fMultipleSelection.setFocus();
			}else{
				FormRequester.block();
				system.activeApplication._mainForm.listDataForm.setCaption(caption);			
				system.activeApplication._mainForm.listDataForm.setRequester(FormRequester, requester, row, col, true);
				system.activeApplication._mainForm.listDataForm.setScriptSql(sql, sql2);			
				system.activeApplication._mainForm.listDataForm.setFields(fields, operator);
				system.activeApplication._mainForm.listDataForm.setLabels(labels);
				system.activeApplication._mainForm.listDataForm.show(withBlank);
				system.activeApplication._mainForm.listDataForm.setDataFromItems();		
				
				
				
				
			}
		}catch(e)
		{
			systemAPI.alert("[filterLib]::ListDataSGFilter:"+e);
		}
	},
	showFilter: function(SG){
		var S = "";
		for (var i =0; i < SG.getRowCount();i++)
		{
			if (SG.getCell(1,i) != 'Lokasi/Cabang' )
			{		  
				S = S + SG.getCell(0,i) + " " + SG.getCell(1,i) + " " + SG.getCell(2,i) + " " + SG.getCell(3,i) + "; ";
			}
		}
		return S;
	}
});