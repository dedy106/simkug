/**
 * @author dweexfuad
 */
//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
//"<img width=18 height=18 src='image/ok.png' />." :"<img width=18 height=18 src='image/error.png' />." )
window.app_eclaim_dashboard_fMonitoring = function(owner,options){
	try{
		if (owner)
		{
			window.app_eclaim_dashboard_fMonitoring.prototype.parent.constructor.call(this, owner,options);
			this.className = "app_eclaim_dashboard_fMonitoring";
			this.maximize();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Monitoring Proses Klaim",99);
			this.setTop(55);
			this.setHeight(this.height + 40);
            this.initComponent();
            this.onClose.set(this,"doClose");						
		}
	}catch(e)
	{
		alert("[app_eclaim_dashboard_fMonitoring]::contruct:"+e,"");
	}
};
window.app_eclaim_dashboard_fMonitoring.extend(window.childForm);
window.app_eclaim_dashboard_fMonitoring.implement({
	doAfterResize: function(width, height){
	   this.setTop(55);
	   this.setHeight(height + 40);
    },
    doClose: function(sender){
        this.app._mainForm.pButton.show();
    },
    initComponent: function(){
		try{
			uses("util_standar;button;saiGrid;sgNavigator;toolbar;roundPanel;datePicker;radioButton;util_filterRep");						
			this.standarLib = new util_standar();
			this.dbLib = new util_dbLib(undefined,this.app._dbSetting);
			this.dbLib.addListener(this);
			this.toolbar = new toolbar(this,{bound:[this.width - 170,5,150,25],buttonClick:[this,"doToolBarClick"]});
			this.toolbar.addButton("bFilter","Filter","icon/dynpro/filter2.png","Filter");
			this.toolbar.addButton("bOptions","Options","icon/dynpro/filter2.png","");
			this.toolbar.makeRound(5);			
			this.p1mp = new panel(this,{bound:[10,35,this.width - 25,this.height - 100],border:3,caption:"Daftar Aset SAP"});
			this.sg1mp = new saiGrid(this.p1mp, {
				bound: [1, 20, this.p1mp.width - 4, this.p1mp.height - 50],
				colCount: 15,
				colTitle: ["Inventarisasi","Rekonsiliasi","No Gabung", "No Kartu Aset", "No SN", "BusA", "Class", "APC", "Deskripsi Asset", "Alamat", "Cap. Date", "Nilai Perolehan", "Nilai AP", "Nilai Buku", "Quantity SAP"],
				colWidth: [[14,13,12,11,10,9,8, 7, 6, 5, 4, 3, 2, 1, 0], [100,100,100,100,100,250,250,100,100,100,100,100,150,100,100]],
				dblClick: [this, "sg1onDblClick"],				
				colFormat: [[11,12,13,14], [cfNilai, cfNilai, cfNilai, cfNilai]],
				colAlign: [[0,1,2], [alCenter, alCenter, alCenter]],
				readOnly: true
			});
            this.sgn = new sgNavigator(this.p1mp, {
				bound: [1, this.p1mp.height - 25, this.p1mp.width - 4, 25],
				buttonStyle: 3,
				pager: [this, "doPager"],
				grid: this.sg1mp
			});
						            			          
			this.pager = 50;
			this.userLogin="";					
			var sql =  "select  count(*) "+
					" from amu_asset a "+
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa "+
					"	inner join amu_bagiklp_d bb on bb.kode_klpfa = a.kode_klpfa and bb.periode = a.periode and bb.jenis_proc = 'FISIK' " +					
					" left outer join amu_kkl_d c on c.no_gabung = a.no_gabung "+
					" left outer join amu_rekon_d d on d.no_gabung = a.no_gabung "+
					" left outer join amu_ver_d e on e.no_gabung = a.no_gabung "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"'";
		
			this.sqlCount = sql;
			this.rowCount = this.dbLib.getRowCount(sql, this.pager);
            this.sgn.setTotalPage(this.rowCount);            			
            this.sgn.rearrange();
            
            this.pFilter = new roundPanel(this,{bound:[this.width - 520,35,500,235],caption:"Filter",visible:false,background:"image/themes/dynpro/roundpanelBgCenter.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8"});          
            
            this.bApply = new button(this.pFilter,{bound:[10,160,80,20],caption:"Apply",click:[this,"doClick"]});
			this.sgFilter = new saiGrid(this.pFilter,{bound:[10,0,this.pFilter.width - 30,150],colCount:4,rowCount:3,
				colTitle:["Filter","Type","Value1","Value2"],selectCell:[this,"doSelectFilterCell"],ellipsClick:[this,"doEllipsFilterClick"],change:[this,"sg1onChange"],
				colWidth:[[3,2,1,0],[100,100,60,150]]});
			this.sgFilter.columns.get(1).setButtonStyle(window.bsAuto);
			var val = new arrayMap({items:["All","=","Range","Like","<="]});			
			this.sgFilter.columns.get(1).setPicklist(val);
            this.pFilter.setTabChildIndex();
			this.sql =  "select  distinct ifnull(c.no_gabung, '-')as status,ifnull(d.no_gabung, '-')as status2,a.no_gabung, a.no_fa, a.no_sn, a.nama, a.kode_klpfa, a.kode_lokfa, a.kode_klpakun,date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.nilai, "+ 	
						 " a.nilai_ap, a.nilai_buku, a.nama2 as alamat, a.jml_fisik "+
					" from amu_asset a "+
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa "+
					"	inner join amu_bagiklp_d bb on bb.kode_klpfa = a.kode_klpfa and bb.periode = a.periode and bb.jenis_proc = 'FISIK' " +					
					" left outer join amu_kkl_d c on c.no_gabung = a.no_gabung "+
					" left outer join amu_rekon_d d on d.no_gabung = a.no_gabung "+					
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"'" ;
			this.filter = "";
			this.doPager(this.sgn,1);			
			this.sgFilter.editData(0,["Periode","All","",""]);
			this.sgFilter.editData(1,["Lokasi Aset","=",this.app._kodeLokfa,""]);			
			this.sgFilter.editData(2,["No Kartu Aset","All","",""]);								
			this.filterRep = new util_filterRep();			
			this.app._mainForm.pButton.hide();
			
		}catch(e){
			alert(e);
		}
	},
	doToolBarClick: function(sender, id){
	   switch(id){
	       case "bFilter" :   
	           this.pFilter.setVisible(!this.pFilter.visible);
	       break;
       }	   
    },	
    doClick: function(sender){
        try{
            if (sender == this.bApply){
                this.filter = this.filterRep.filterStr("a.kode_lokfa",this.sgFilter.getCell(1,1),this.sgFilter.getCell(2,1),this.sgFilter.getCell(3,1),"and")+
				    this.filterRep.filterStr("a.no_gabung",this.sgFilter.getCell(1,2),this.sgFilter.getCell(2,2),this.sgFilter.getCell(3,2),"and");
				
    			this.rowCount = this.dbLib.getRowCount(this.sqlCount+this.filter, this.pager);				
				
                this.sgn.setTotalPage(this.rowCount);            			
                this.sgn.rearrange();
                
    	        this.doPager(this.sgn,1);		        
    	        this.pFilter.hide();
            }            
       }catch(e){
            alert(e);
       }
    },
    
	doPager: function(sender,page){
	       this.activePage = page;
	       this.dbLib.getDataProviderPageA(this.sql+this.filter+" order by a.kode_lokfa, a.kode_klpfa,a.no_gabung ",page, this.pager);   			 
    },
	doRequestReady: function(sender, methodName, result){				
		try{
		   if (sender === this.dbLib) {
			   	if (methodName == "getDataProviderPage") {				
			   		eval("brg = " + result + ";");
			   		if (typeof(brg) !== "string") {
			   			this.sg1mp.clear();
			   			this.gridDataTmp = new arrayMap();
			   			if (brg.rs.rows[0] != undefined) {
			   				this.sg1mp.showLoading();
			   				var line;
			   				for (var i in brg.rs.rows) {
			   					line = brg.rs.rows[i];
			   					this.gridDataTmp.set(line.no_gabung, line);
			   					this.sg1mp.appendData([(line.status != "-" ? "<img width=17 height=17 src='icon/green.png' />." : "<img width=17 height=17 src='icon/red.png' />."),
									(line.status2 != "-" ? "<img width=17 height=17 src='icon/green.png' />." : "<img width=17 height=17 src='icon/red.png' />."),									
								 	line.no_gabung, line.no_fa, line.no_sn, line.kode_lokfa, line.kode_klpfa, line.kode_klpakun, line.nama, line.alamat, line.tgl_perolehan, floatToNilai(line.nilai), floatToNilai(line.nilai_ap), floatToNilai(line.nilai_buku), line.jml_fisik]);
			   					this.sg1mp.rows.get(i).setData(line);		   					
			   					//this.sg1mp.rows.get(i).setHint("double klik untuk menampilkan detail");
							}
							this.sg1mp.hideLoading();
							this.sg1mp.frame.scrollTop = 0;
							this.sg1mp.setNoUrut((this.activePage - 1) * this.pager);
						}
					}
				}
				if (methodName == "execArraySQL") {
					if (result.toLowerCase().search("error") != -1) 
						systemAPI.alert(result);
					else {
						this.dataPrinted = new arrayMap();
						for (var i = 0; i < this.sg1mp.getRowCount(); i++) {
							if (this.sg1mp.cells(0, i) == "true" && this.gridDataTmp.get(this.sg1mp.cells(1, i)).status == "false") {
								this.dataPrinted.set(this.sg1mp.cells(1, i), this.sg1mp.rows.get(i).data);
							}
						}
						this.doPager(this.sgn, this.activePage);
						if (this.dataPrinted.getLength() > 0) 
							this.htmlPrinted = this.printDetail(this.dataPrinted);
						else 
							system.info(this, "Tidak ada data yang bisa diproses", "Cek data anda");
					}
				}
			}		   
		  }catch(e){
		  	alert(e+"\r\n"+result);
		  }
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 2)
				window.open("server/media/"+this.sg1mp2.getCell(1,row));
		}catch(e){
			alert(e);
		}
	},
	sg1onDblClick:function(sender, col, row){
		try{
			if (col < 9){
				if (this.trail2 === undefined){
					uses("app_assetsap_dashboard_fLapView",true);
					this.trail2 = new app_assetsap_dashboard_fLapView(this.owner,undefined, this);			
				}
				this.block(true);
				this.trail2.setValue(sender.cells(2,row));
				this.trail2.setPanelCaption("Data Inventarisasi dan Rekonsiliasi "+ sender.cells(8,row));
				this.trail2.show();								
			}
		}catch(e){
			alert(e);
		}
	},
	doSgClick:function(sender, col, row){				
	},
	mainButtonClik: function(sender){
	   if (sender == this.app._mainForm.bSimpan) system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini akan di proses.");	
    },    
	doSelectFilterCell: function(sender, col, row){
		try{
			sender.columns.get(2).setReadOnly(false);
			sender.columns.get(2).setReadOnly(true);
			this.filterRep.setSGFilterRowTipe(sender, row,new Array(0,1,2,3,4,5),new  Array("123","123","123","123","123","123"));			
			this.filterRep.setSGFilterRowButtonStyle(sender, row,new Array(0,1,2,3,4,5),new  Array(0,2,2,2,2,2));
			if (row == 0)
			{
			
				var rs = this.dbLib.runSQL("select distinct periode from amu_asset where kode_lokasi='"+this.app._lokasi+"' order by periode desc ");			
				if (rs instanceof arrayMap){
					sender.columns.get(2).pickList.clear();
					var ix=0;
					for (var i in rs.objList){								
						sender.columns.get(2).pickList.set(ix, rs.get(i).get("periode"));
						ix++;
					}
				}
			}
		}catch(e){
			alert(e);
		}
		
	},
	doEllipsFilterClick: function(sender, col, row){
		if (row == 1)
		{
			this.filterRep.ListDataSGFilter(this, "Data lokasi Aset(Bus.Area)",sender, sender.row, sender.col,
					"select distinct a.kode_lokfa, c.nama from amu_asset a "+
					"	inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa " +									
					"	inner join amu_bagiklp_d b on b.kode_klpfa = a.kode_klpfa and b.periode = a.periode and b.jenis_proc = 'FISIK' " +					
					" where a.kode_lokasi = '"+this.app._lokasi+"'  and a.periode = '"+this.app._periode +"' and  a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' ",
					"select count(*) from (select distinct a.kode_lokfa, c.nama from amu_asset a "+
					"	inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa " +									
					"	inner join amu_bagiklp_d b on b.kode_klpfa = a.kode_klpfa and b.periode = a.periode and b.jenis_proc = 'FISIK' " +					
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.periode = '"+this.app._periode +"' and  a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"') ",
					["a.kode_lokfa","b.nama"],"and",["BusA","Descript"]);
		}	
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Aset",sender, sender.row, sender.col,
					"select distinct a.no_gabung, a.nama from amu_asset a "+
					"	inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa " +									
					"	inner join amu_bagiklp_d b on b.kode_klpfa = a.kode_klpfa and b.periode = a.periode and b.jenis_proc = 'FISIK' " +					
					" where a.kode_lokasi = '"+this.app._lokasi+"'  and a.periode = '"+this.app._periode +"' and  a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' "+
					this.filterRep.filterStr("a.kode_lokfa",sender.cells(1,1),sender.cells(2,1),sender.cells(3,1),"and"),
					"select count(*) from (select distinct a.no_gabung, a.nama from amu_asset a "+
					"	inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa " +									
					"	inner join amu_bagiklp_d b on b.kode_klpfa = a.kode_klpfa and b.periode = a.periode and b.jenis_proc = 'FISIK' " +					
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.periode = '"+this.app._periode +"' and  a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' "+
					this.filterRep.filterStr("a.kode_lokfa",sender.cells(1,1),sender.cells(2,1),sender.cells(3,1),"and")+ ") a ",
					["a.no_gabung","a.nama"],"and",["NKA + SNo","Descript"]);
		}		
	}
});
