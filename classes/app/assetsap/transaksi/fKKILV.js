//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
//"<img width=18 height=18 src='image/ok.png' />." :"<img width=18 height=18 src='image/error.png' />." )
window.app_assetsap_transaksi_fKKILV = function(owner,options){
	try{
		if (owner)
		{
			window.app_assetsap_transaksi_fKKILV.prototype.parent.constructor.call(this, owner,options);
			this.className = "app_assetsap_transaksi_fKKILV";
			this.maximize();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","View Inventarisasi Aset Tanah Bangunan",99);
			this.setTop(55);
			this.setHeight(this.height + 40);
            this.initComponent();
            this.onClose.set(this,"doClose");						
		}
	}catch(e)
	{
		alert("[app_assetsap_transaksi_fKKILV]::contruct:"+e,"");
	}
};
window.app_assetsap_transaksi_fKKILV.extend(window.childForm);
window.app_assetsap_transaksi_fKKILV.implement({
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
			this.bAdd = new button(this,{bound:[30,10,80,20], caption:"Input KKIL", click:[this,"doInputKKIL"]});
			this.bEdit = new button(this,{bound:[130,10,80,20], caption:"Edit KKIL", click:[this,"doInputKKIL"]});
			this.p1mp = new panel(this,{bound:[10,35,this.width - 25,250],border:3,caption:"Daftar Aset SAP"});
			this.sg1mp = new saiGrid(this.p1mp, {
				bound: [1, 20, this.p1mp.width - 4, this.p1mp.height - 50],
				colCount: 17,
				colTitle: ["Flag","No Gabung", "No Kartu Aset", "No SN", "BusA", "Klas", "Jenis", "Deskripsi Asset", "Alamat", "Cap. Date", "Nilai Perolehan", "Nilai AP", "Nilai Buku", "Jml Fisik SAP","Plant","Location","Download"],
				colWidth: [[16,15,14,13,12,11,10,9,8, 7, 6, 5, 4, 3, 2, 1, 0], [120,100,100,100,100,100,100,100,250,250,100,100,100,100,100,150,50]],
				//dblClick: [this, "sg1onDblClick"],
				click: [this, "doSgClick"],				
				colFormat: [[10,11,12,13,16], [cfNilai, cfNilai, cfNilai, cfNilai, cfButton]],
				colAlign: [[9,16], [alCenter, alCenter]],
				readOnly: true
			});
            this.sgn = new sgNavigator(this.p1mp, {
				bound: [1, this.p1mp.height - 25, this.p1mp.width - 4, 25],
				buttonStyle: 3,
				pager: [this, "doPager"],
				grid: this.sg1mp
			});
			this.img1 = new image(this.sgn, {bound:[this.sgn.width - 200,4,16,16], image:"icon/green.png"});
			this.lbl1 = new label(this.sgn, {bound:[this.sgn.width - 180, 5, 80,20], caption:"Sudah diInput"});
			this.img2 = new image(this.sgn, {bound:[this.sgn.width - 100,4,16,16], image:"icon/red.png"});
			this.lbl2 = new label(this.sgn, {bound:[this.sgn.width - 80, 5, 80,20], caption:"Belum diInput"});
			this.p1mp2 = new panel(this, {
				bound: [10, 300, this.width - 25, 180],
				border: 3,
				caption: "Data Hasil Inventarisasi dan Verifikasi"
			});
			this.sg1mp2 = new saiGrid(this.p1mp2, {
				bound: [1, 20, this.p1mp.width - 4, 128],
				colCount: 15,
				readOnly: true,
				colTitle: ["No Inventarisasi","Tgl Inventaris","No Gabung", "Jumlah Fisik","No Label","Status","Ket. Status","Sertifikat/IMB/PBB/DLL","Luas","Dekripsi Lokasi","Keterangan","no Verifikasi","Status Final","Keterangan Verifikasi","Tindak Lanjut"],
				colWidth: [[14,13,12,11,10,,9,8,7,6,5,4,3,2, 1, 0], [200,200,100,100,250,200,100,150,200,100,100,100,100,100,130]],				
				click: [this, "doSgBtnClick"],
				colAlign: [[2], [alCenter]]
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
            
            this.pFilter = new roundPanel(this,{bound:[this.width - 520,35,500,235],caption:"Filter",visible:false,background:"image/themes/dynpro/roundpanelBgCenter.png",icon:"image/themes/dynpro/iconpanel.png",color:"#edf5f8",titleBg:"#95cae8"});          
            
            this.bApply = new button(this.pFilter,{bound:[10,160,80,20],caption:"Apply",click:[this,"doClick"]});
			this.sgFilter = new saiGrid(this.pFilter,{bound:[10,0,this.pFilter.width - 30,150],colCount:4,rowCount:3,
				colTitle:["Filter","Type","Value1","Value2"],selectCell:[this,"doSelectFilterCell"],ellipsClick:[this,"doEllipsFilterClick"],change:[this,"sg1onChange"],
				colWidth:[[3,2,1,0],[100,100,60,150]]});
			this.sgFilter.columns.get(1).setButtonStyle(window.bsAuto);
			var val = new arrayMap({items:["All","=","Range","Like","<="]});			
			this.sgFilter.columns.get(1).setPicklist(val);
            this.pFilter.setTabChildIndex();
			this.sql =  "select  distinct ifnull(c.no_gabung, '-')as status, a.no_gabung, a.no_fa, a.no_sn, a.nama,a.kode_klpfa, a.kode_lokfa, a.jenis, date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, a.nilai, "+ 	
					" a.nilai_ap, a.nilai_buku, a.nama2 as alamat, a.jml_fisik, case when a.ref1 = '' or a.ref1 = ' ' then '-' else a.ref1 end as ref1, case when a.ref2 = ' ' or a.ref2 = ''  then '-' else a.ref2 end as ref2, e.lampiran "+
					" from amu_asset a "+
					" inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa "+										
					"	inner join amu_bagiklp_d d on d.kode_klpfa = a.kode_klpfa  and d.jenis_proc = 'FISIK' and a.periode = d.periode " +					
					" left outer join amu_kkl_d c on c.no_gabung = a.no_gabung and c.periode = a.periode "+
					" left outer join amu_kkl_m e on e.no_inv = c.no_inv  "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.periode = '"+this.app._periode+"' and a.kode_klpfa like '101%'" ;			
			this.filter = " and a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"'";
			this.sqlCount = this.sql;
			this.rowCount = this.dbLib.getRowCount("select count(*) from ("+this.sql+")", this.pager);
            this.sgn.setTotalPage(this.rowCount);            			
            this.sgn.rearrange();
            
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
				var diva = this.sgFilter.getCell(2,1).substr(0,3) == "TDV" || this.sgFilter.getCell(2,1).substr(0,3) == "TCS" ;
                this.filter = this.filterRep.filterStr(diva ? "a.ref1":"a.kode_lokfa",this.sgFilter.getCell(1,1),this.sgFilter.getCell(2,1),this.sgFilter.getCell(3,1),"and")+
								this.filterRep.filterStr("a.no_gabung",this.sgFilter.getCell(1,2),this.sgFilter.getCell(2,2),this.sgFilter.getCell(3,2),"and");
				
    			this.rowCount = this.dbLib.getRowCount("select count(*) from ("+this.sqlCount+this.filter+") a", this.pager);				
				
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
	       this.dbLib.getDataProviderPageA(this.sql+this.filter+" order by status desc, kode_lokfa, a.no_gabung ",page, this.pager);   			 
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
			   					this.sg1mp.appendData([(line.status != "-" ? "<img width=17 height=17 src='icon/green.png' />." : "<img width=17 height=17 src='icon/red.png' />."), line.no_gabung, line.no_fa, line.no_sn, line.kode_lokfa, line.kode_klpfa, line.jenis, line.nama, line.alamat, line.tgl_perolehan, floatToNilai(line.nilai), floatToNilai(line.nilai_ap), floatToNilai(line.nilai_buku), line.jml_fisik, line.ref1, line.ref2, line.lampiran]);
			   					this.sg1mp.rows.get(i).setData(line);		   					
			   					//this.sg1mp.rows.get(i).setHint("double klik untuk menampilkan detail");
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
			if (col === 16)
				window.open("server/media/amu/"+this.sg1mp2.getCell(16,row));
		}catch(e){
			alert(e);
		}
	},
	sg1onDblClick:function(sender, col, row){
		try{
			if (col < 9){
				if (this.trail2 === undefined){
					uses("app_eclaim_transaksi_fLapView");
					this.trail2 = new app_eclaim_transaksi_fLapView(this.owner,undefined, this);			
				}
				this.block(true);
				this.trail2.setValue({klaim:sender.cells(0,row)});
				this.trail2.setPanelCaption("Detail Klaim "+ sender.cells(0,row));
				this.trail2.show();				
			}
		}catch(e){
			alert(e);
		}
	},
	doSgClick:function(sender, col, row){		
		if (col == 16){
			window.open("server/media/amu/" + sender.cells(16,row) );
			return;
		}
		//if (col == 9)
		{
			try{
			
				var data = this.dbLib.getDataProvider("select a.no_inv, date_format(a.tanggal,'%d-%m-%Y') as tgl, b.no_gabung,  b.jml_fisik, b.no_label, "+ 
					"		b.kode_status, c.nama as nm_status, b.no_sertifikat, b.luas, b.alamat, b.keterangan "+
					" 	, d.no_ver, d.status_final, d.verifikasi, d.tindak_lanjut "+
					"	from amu_kkl_m a "+
					"	 inner join amu_kkl_d b on b.no_inv = a.no_inv "+
					"	 left outer join amu_status c on c.kode_status = b.kode_status and c.jenis = 'TB' "+
					"	 left outer join amu_ver_d d on d.no_gabung = b.no_gabung "+
					"where b.no_gabung = '"+this.sg1mp.cells(1,row)+"' and b.periode = '"+this.app._periode+"' order by a.tanggal desc ",true);		
				this.sg1mp2.clear();
				if (typeof(data) != "string")
				{  
					if (data.rs.rows[0] != undefined)
					{
						this.sg1mp2.showLoading();
						this.sg1mp2.setColWidth([2,1,0],[100,250,100]);
						for (var k in data.rs.rows){
							var line=data.rs.rows[k];
							this.sg1mp2.appendData([line.no_inv, line.tgl, line.no_gabung, line.jml_fisik, line.no_label, line.kode_status, line.nm_status, line.no_sertifikat, line.luas, line.alamat, line.keterangan, line.no_ver, line.status_final, line.verifikasi, line.tindak_lanjut]);							
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
					"select distinct a.kode_lokfa, a.nama from amu_lokasi a "+					
					" where a.kode_lokasi = '"+this.app._lokasi+"'  and  a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' ",
					
					"select count(*) from amu_lokasi a "+					
					" where a.kode_lokasi = '"+this.app._lokasi+"'  and  a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' ",
					["a.kode_lokfa","a.nama"],"and",["BusA","Descript"]);
		}	
		if (row == 2)
		{
			var diva = sender.cells(2,1).substr(0,3) == "TDV" || sender.cells(2,1).substr(0,3) == "TCS";
			this.filterRep.ListDataSGFilter(this, "Data Aset",sender, sender.row, sender.col,
					"select distinct a.no_gabung, a.nama from amu_asset a "+
					"	inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa " +									
					"	inner join amu_bagiklp_d b on b.kode_klpfa = a.kode_klpfa and b.periode = a.periode and b.jenis_proc = 'FISIK' " +					
					" where a.kode_lokasi = '"+this.app._lokasi+"'  and a.periode = '"+this.app._periode +"' and  a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' "+
					this.filterRep.filterStr(diva ? "a.ref1":"a.kode_lokfa",sender.cells(1,1),sender.cells(2,1),sender.cells(3,1),"and"),
					"select count(*) from (select distinct a.no_gabung, a.nama from amu_asset a "+
					"	inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa " +									
					"	inner join amu_bagiklp_d b on b.kode_klpfa = a.kode_klpfa and b.periode = a.periode and b.jenis_proc = 'FISIK' " +					
					" where a.kode_lokasi = '"+this.app._lokasi+"' and a.periode = '"+this.app._periode +"' and  a.kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' "+
					this.filterRep.filterStr(diva ? "a.ref1":"a.kode_lokfa",sender.cells(1,1),sender.cells(2,1),sender.cells(3,1),"and")+ ") a ",
					["a.no_gabung","a.nama"],"and",["NKA + SNo","Descript"]);
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
		if (sender == this.bAdd){			
			if (this.gridDataTmp.get(this.sg1mp.cells(1,this.sg1mp.row)).status == "-"){
				this.app._mainForm.pButton.show();
				this.hide();
				uses("app_assetsap_transaksi_fKKIL",true);
				var row = this.sg1mp.row;				
				this.formKKIL = new app_assetsap_transaksi_fKKIL(this.owner, this.sg1mp.cells(4,row), this.sg1mp.cells(5,row),this.sg1mp.cells(1,row), this);
			}else {
				system.info(this,"No Aset "+ this.sg1mp.cells(2,this.sg1mp.row)+" sudah di input KKIL-nya","");
			}
		}else {
			if (this.gridDataTmp.get(this.sg1mp.cells(1,this.sg1mp.row)).status != "-"){
				this.app._mainForm.pButton.show();
				this.hide();
				uses("app_assetsap_transaksi_fKKILK",true);
				var row = this.sg1mp.row;				
				this.formKKIL = new app_assetsap_transaksi_fKKILK(this.owner, this.sg1mp.cells(4,row), this.sg1mp2.cells(0,this.sg1mp2.row), this);
			}else {
			}
		}
		
	},
	refresh: function(){
		this.doPager(this.sgn,1);
	}
});
