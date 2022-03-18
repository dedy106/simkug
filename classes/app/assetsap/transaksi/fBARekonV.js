//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
//"<img width=18 height=18 src='image/ok.png' />." :"<img width=18 height=18 src='image/error.png' />." )
window.app_assetsap_transaksi_fBAV = function(owner,options){
	try{
		if (owner)
		{
			window.app_assetsap_transaksi_fBAV.prototype.parent.constructor.call(this, owner,options);
			this.className = "app_assetsap_transaksi_fBAV";
			this.maximize();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Daftar BA",99);
			this.setTop(55);
			this.setHeight(this.height + 40);
            this.initComponent();
            this.onClose.set(this,"doClose");						
		}
	}catch(e)
	{
		alert("[app_assetsap_transaksi_fBAV]::contruct:"+e,"");
	}
};
window.app_assetsap_transaksi_fBAV.extend(window.childForm);
window.app_assetsap_transaksi_fBAV.implement({
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
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.toolbar = new toolbar(this,{bound:[this.width - 170,5,150,25],buttonClick:[this,"doToolBarClick"]});
			this.toolbar.addButton("bFilter","Filter","icon/dynpro/filter2.png","Filter");
			this.toolbar.addButton("bOptions","Options","icon/dynpro/filter2.png","");
			this.toolbar.makeRound(5);			
			//this.bAdd = new button(this,{bound:[30,10,80,20], caption:"Input KKIL", click:[this,"doInputKKIL"]});
			//this.bEdit = new button(this,{bound:[130,10,80,20], caption:"Edit KKIL", click:[this,"doInputKKIL"]});
			this.p1mp = new panel(this,{bound:[10,35,this.width - 25,250],border:3,caption:"Daftar BA"});
			this.sg1mp = new saiGrid(this.p1mp, {
				bound: [1, 20, this.p1mp.width - 4, this.p1mp.height - 50],
				colCount: 7,
				readOnly: true,
				colTitle: ["No BA","Regional","Nama Regional","Tanggal","Tempat","Alamat","File"],
				colWidth: [[6,5,4,3,2, 1, 0], [120,250,150,100,200,80,120]],
				click: [this, "doSgClick"],
				colAlign: [[6], [alCenter]],
				readOnly: true
			});
            this.sgn = new sgNavigator(this.p1mp, {
				bound: [1, this.p1mp.height - 25, this.p1mp.width - 4, 25],
				buttonStyle: 3,
				pager: [this, "doPager"],
				grid: this.sg1mp
			});			
			this.p1mp2 = new panel(this, {
				bound: [10, 300, this.width - 25, 180],
				border: 3,
				caption: "Data Hasil Inventarisasi dan Verifikasi"
			});
			this.sg1mp2 = new saiGrid(this.p1mp2, {
				bound: [1, 20, this.p1mp.width - 4, 128],
				colCount: 4,
				readOnly: true,
				colTitle: ["Kode Status","Nama","Jml","Nilai Buku"],
				colWidth: [[3,2, 1, 0], [100,100,250,120]],
				colFormat: [[3,2],[cfNilai, cfNilai]],
				click: [this, "doSgBtnClick"]				
			});
			this.sgn2 = new sgNavigator(this.p1mp2, {
				bound: [1, this.p1mp2.height - 25, this.p1mp2.width - 2, 25],
				buttonStyle: 3,
				pager: [this, "doPager"],
				beforePrint: [this, "doBeforePrintSg2"],
				grid: this.sg1mp2
			});
            			           
			this.pager = 50;
			this.userLogin="";
			if (this.app._userStatus=='U' )
			{
				this.userLogin = " and nik_buat='"+this.app._userLog+"'"; 
			}
			
			var sql =  "select  count(*)"+
					" from amu_ba_m a "+
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa "+															
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.periode = '"+this.app._periode+"' and a.jenis_ba = 'REKON'";
		
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
			this.sql =  "select  distinct  a.no_ba, a.kode_lokfa, b.nama, date_format(a.tgl_ba,'%d-%m-%Y') as tanggal, a.tempat, a.alamat, a.file_ba "+
					" from amu_ba_m a "+
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa "+					
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.periode = '"+this.app._periode+"' and a.jenis_ba = 'REKON' " ;			
			this.filter = " and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"'";
			this.doPager(this.sgn,1);			
			this.sgFilter.editData(0,["Periode","All","",""]);
			this.sgFilter.editData(1,["Lokasi Aset","=",this.app._kodeLokfa,""]);			
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
                this.filter = this.filterRep.filterStr("a.kode_lokfa",this.sgFilter.getCell(1,1),this.sgFilter.getCell(2,1),this.sgFilter.getCell(3,1),"and");
				
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
	       this.dbLib.getDataProviderPageA(this.sql+this.filter+" order by a.no_ba ",page, this.pager);   			 
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
			   					this.sg1mp.appendData([line.no_ba, line.kode_lokfa, line.nama, line.tanggal, line.tempat, line.alamat, line.file_ba]);
			   					this.sg1mp.rows.get(i).setData(line);		   								   					
							}
							this.sg1mp.hideLoading();
							this.sg1mp.frame.scrollTop = 0;
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
		}catch(e){
			alert(e);
		}
	},
	sg1onDblClick:function(sender, col, row){
		try{			
		}catch(e){
			alert(e);
		}
	},
	doSgClick:function(sender, col, row){		
		if (col == 6){
			window.open("server/media/amu/" + sender.cells(6,row) );
			return;
		}
		//if (col == 9)
		{
			try{
			
				var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[ 
					"select  a.kode_status, b.nama, a.jml, a.nilai_buku "+
					"	from amu_ba_d a "+					
					"	inner join amu_ba_m c on c.no_ba = a.no_ba "+
					"	 inner join amu_status b on b.kode_status = a.kode_status and b.jenis = c.jenis "+					
					"where a.no_ba = '"+this.sg1mp.cells(0,row)+"' order by a.kode_status "]}),true);					
				this.sg1mp2.clear();
				if (typeof(data) != "string")
				{  
					data = data.result[0];
					if (data.rs.rows[0] != undefined)
					{
						this.sg1mp2.showLoading();
						this.sg1mp2.setColWidth([3,2,1,0],[100,100,250,100]);
						for (var k in data.rs.rows){
							var line=data.rs.rows[k];
							this.sg1mp2.appendData([line.kode_status, line.nama, floatToNilai(line.jml), floatToNilai(line.nilai_buku)]);
						}
						this.sg1mp2.hideLoading();
						this.sg1mp2.frame.scrollTop = 0;
					}
				}				
				this.sgn2.setTotalPage(1);
				this.sgn2.rearrange();
				this.htmlPrinted = undefined;				
			}catch(e){
				alert(e);
			}
		}
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
					"select distinct a.kode_lokfa, c.nama from amu_ba_m a "+
					"	inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa " +					
					" where a.kode_lokasi = '"+this.app._lokasi+"'  and a.jenis_ba like 'REKON' and a.periode = '"+this.app._periode +"' and  a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' ",
					
					"select count(*) from (select distinct a.kode_lokfa, c.nama from amu_ba_m a "+
					"	inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa " +														
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.jenis_ba like 'REKON' and a.periode = '"+this.app._periode +"' and  a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"') ",
					["a.kode_lokfa","b.nama"],"and",["BusA","Descript"]);
		}		
	},
	sg1onChange: function(sender, col , row){
		if (col==1)
		{
		 if (sender.getCell(1,row)=="All")
		 {
			sender.setCell(2,row,"");
			sender.setCell(3,row,"");
		 }
		} 
	},
	doInputKKIL: function(sender){		
	},
	refresh: function(){
		this.doPager(this.sgn,1);
	}
});
