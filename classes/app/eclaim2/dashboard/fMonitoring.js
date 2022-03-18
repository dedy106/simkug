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
window.app_eclaim2_dashboard_fMonitoring = function(owner,options){
	try{
		if (owner)
		{
			window.app_eclaim2_dashboard_fMonitoring.prototype.parent.constructor.call(this, owner,options);
			this.className = "app_eclaim2_dashboard_fMonitoring";
			this.maximize();
			this.app._mainForm.childFormConfig(this, "mainButtonClick","Monitoring Proses Klaim",99);
			this.setTop(55);
			this.setHeight(this.height + 50);
            this.initComponent();
            this.onClose.set(this,"doClose");						
		}
	}catch(e)
	{
		alert("[app_eclaim2_dashboard_fMonitoring]::contruct:"+e,"");
	}
};
window.app_eclaim2_dashboard_fMonitoring.extend(window.childForm);
window.app_eclaim2_dashboard_fMonitoring.implement({
	doAfterResize: function(width, height){
	   this.setTop(55);
	   this.setHeight(height + 50);
    },
    doClose: function(sender){
        this.app._mainForm.pButton.show();
    },
    initComponent: function(){
		try{
			uses("util_standar;button;saiGrid;sgNavigator;toolbar;pageControl;roundPanel;datePicker;radioButton;util_filterRep;saiMemo");						
			this.standarLib = new util_standar();
			this.dbLib = new util_dbLib(undefined,this.app._dbSetting);
			this.dbLib.addListener(this);
			this.p1mp = new pageControl(this,{bound:[10,5,this.width - 25,this.height - 100],border:3,
				childPage: ["Filter","Daftar Klaim","Dokumen Klaim","Data Tuntutan Klaim","Data Bantek","Data Survey","Data Adjustment","Mitra Kerja","Pekerjaan","BAUT","BAST","Discharge Form"],
				caption:"Daftar Klaim"
			});			
			//Tab 1
			this.sg1mp = new saiGrid(this.p1mp.childPage[1], {
				bound: [1, 10, this.p1mp.width - 124, this.p1mp.height - 50],
				colCount:9,readOnly:true,dblClick:[this,"doGridDoubleClick"],
				colTitle:["No Klaim","No Dokumen","Tgl Terima","Lokasi","Obyek","Penyebab","Nilai Estimasi","Nilai Adjust","Nilai Bayar"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,150,150,150,80,180,100]], colFormat:[[8,7,6],[cfNilai,cfNilai, cfNilai]],rowSelect:true,
				cellEnter:[this,"doCellEnter"]
			});			
            this.sgn = new sgNavigator(this.p1mp.childPage[1], {
				bound: [1, this.p1mp.height - 25, this.p1mp.width - 4, 25],
				buttonStyle: 3,
				pager: [this, "doPager"],
				grid: this.sg1mp
			});
			this.btnDet = new button(this.p1mp.childPage[1],{ bound:[this.p1mp.width - 104, 20, 80, 20], caption:"Details", click:[this,"doDetail"]});
			
			//Tab 2
			this.sg2 = new saiGrid(this.p1mp.childPage[2], {
				bound:[1,10,200,this.p1mp.height - 50],
				colCount:1, readOnly:true, 
				colTitle:"Dokumen",
				colWidth:[[0],[170]]
			});
			this.sg3 = new saiGrid(this.p1mp.childPage[2], {
				bound: [205, 10, this.p1mp.width - 220, this.p1mp.height - 50],
				colCount: 4,
				colTitle : "Kode Ref, Nama Ref, Dokumen, Keterangan Dokumen",
				colWidth:[[3,2,1,0],[250, 200, 200,100]]
			});
			//Tab 3
			this.sg4 = new saiGrid(this.p1mp.childPage[3], {
				bound:[1,10,400,this.p1mp.height - 50],
				colCount:1, readOnly:true, 
				colTitle:"Dokumen",
				colWidth:[[0],[370]]
			});			            			          
			//Tab 4
			this.sg41 = new saiGrid(this.p1mp.childPage[4], {
				bound:[1,10,400,this.p1mp.height - 50],
				colCount:1, readOnly:true, 
				colTitle:"Dokumen",
				colWidth:[[0],[370]]
			});			   
			
			//Tab 5
			this.pSurvey = this.p1mp.childPage[5];
			this.pSurvey.no = new saiLabelEdit(this.pSurvey,{bound:[10,10,200,20], caption:"No Survey", readOnly:true});
			this.pSurvey.tgl = new saiLabelEdit(this.pSurvey,{bound:[250,10,200,20], caption:"Tgl Survey", readOnly:true});
			this.pSurvey.ket = new saiMemo(this.pSurvey,{bound:[10,11,this.p1mp.width - 50,50], caption:"Keterangan", readOnly:true});
			this.pSurvey.status = new saiLabelEdit(this.pSurvey,{bound:[10,12,200,20], caption:"Status", readOnly:true});
			this.sg5 = new saiGrid(this.pSurvey, {
				bound:[10,10,400,this.p1mp.height - 120],
				colCount:1, readOnly:true, 
				colTitle:"Dokumen",
				colWidth:[[0],[370]]
			});			   
			this.pSurvey.rearrangeChild(10,23);         			  
			//Tab 6
			this.pAdjust = this.p1mp.childPage[6];
			this.pAdjust.no = new saiLabelEdit(this.pAdjust,{bound:[10,10,200,20], caption:"No Adjustment", readOnly:true});
			this.pAdjust.tgl = new saiLabelEdit(this.pAdjust,{bound:[250,10,200,20], caption:"Tgl Adjust", readOnly:true});
			this.pAdjust.ket = new saiMemo(this.pAdjust,{bound:[10,11,this.p1mp.width - 50,50], caption:"Keterangan", readOnly:true});
			this.pAdjust.status = new saiLabelEdit(this.pAdjust,{bound:[10,12,200,20], caption:"Status", readOnly:true});
			this.pAdjust.nilai = new saiLabelEdit(this.pAdjust, {bound:[10,13,200,20], caption:"Nilai DP", readOnly:true, tipeText: ttNilai});
			this.pAdjust.nilai2 = new saiLabelEdit(this.pAdjust, {bound:[10,14,200,20], caption:"Nilai ", readOnly:true, tipeText: ttNilai});
			this.pAdjust.nilai3 = new saiLabelEdit(this.pAdjust, {bound:[10,15,200,20], caption:"Nilai Deductable", readOnly:true, tipeText: ttNilai});			
			this.sg51 = new saiGrid(this.pAdjust, {
				bound:[10,10,400,this.p1mp.height - 200],
				colCount:1, readOnly:true, 
				colTitle:"Dokumen",
				colWidth:[[0],[370]]
			});			   
			this.pAdjust.rearrangeChild(10,23);         			  
			//Tab 7
			this.pMitra = this.p1mp.childPage[7];
			this.pMitra1 = new panel(this.pMitra,{bound:[10,10,600,this.p1mp.height -50], caption:"Data Vendor yang ditunjuk"});			
			this.pMitra2 = new panel(this.pMitra,{bound:[620,10,this.p1mp.width - 640,this.p1mp.height -50],caption:"Dokumen/Attachment"});			
			this.sg7 = new saiGrid(this.pMitra1, {
				bound:[10,20,580,this.p1mp.height - 80],
				colCount:4, readOnly:true, 
				colTitle:"Kode Vendor, Nama Vendor, No SPK, Tgl SPK",
				colWidth:[[3,2,1,0],[100,250,270,100]]
			});			   
			
			this.sg6 = new saiGrid(this.pMitra2, {
				bound:[10,20,this.pMitra2.width - 20,this.p1mp.height - 80],
				colCount:1, readOnly:true, 
				colTitle:"Dokumen",
				colWidth:[[0],[370]]
			});			   
			this.pMitra.rearrangeChild(10,23);         			  
			//Tab 8
			this.pKerja = this.p1mp.childPage[8];
			this.pKerja1 = new panel(this.pKerja,{bound:[10,10,600,this.p1mp.height -50], caption:"Data Vendor"});			
			this.pKerja2 = new panel(this.pKerja,{bound:[620,10,this.p1mp.width - 640,this.p1mp.height -50],caption:"Item Pekerjaan oleh vendor"});			
			this.sg8 = new saiGrid(this.pKerja1, {
				bound:[10,20,580,this.p1mp.height - 80],
				colCount:3, readOnly:true, 
				colTitle:"Kode Vendor, Nama Vendor, Bobot",
				colWidth:[[2,1,0],[150,270,100]]
			});			   
			
			this.sg9 = new saiGrid(this.pKerja2, {
				bound:[10,20,this.pKerja2.width - 20,this.p1mp.height - 80],
				colCount:1, readOnly:true, 
				colTitle:"Dokumen",
				colWidth:[[0],[370]]
			});			   
			this.pKerja.rearrangeChild(10,23);  
			
			//Tab 9
			this.pBAUT = this.p1mp.childPage[9];			
			this.pBAUT1 = new panel(this.pBAUT,{bound:[10,10,600,this.p1mp.height -50], caption:"Data Vendor"});			
			this.pBAUT2 = new panel(this.pBAUT,{bound:[620,10,this.p1mp.width - 640,this.p1mp.height -50],caption:"Dokumen BAUT"});			
			this.sg10 = new saiGrid(this.pBAUT1, {
				bound:[10,20,580,this.p1mp.height - 80],
				colCount:4, readOnly:true, 
				colTitle:"Kode Vendor, Nama Vendor, Tgl BAUT, No BAUT",
				colWidth:[[3,2,1,0],[100,100,250,100]]
			});			   
			
			this.sg11 = new saiGrid(this.pBAUT2, {
				bound:[10,20,this.pBAUT2.width - 20,this.p1mp.height - 80],
				colCount:1, readOnly:true, 
				colTitle:"Dokumen",
				colWidth:[[0],[370]]
			});			   
			this.pBAUT.rearrangeChild(10,23);  
			//Tab 10
			this.pBAST = this.p1mp.childPage[10];			
			this.pBAST1 = new panel(this.pBAST,{bound:[10,10,600,this.p1mp.height -50], caption:"Data Vendor"});			
			this.pBAST2 = new panel(this.pBAST,{bound:[620,10,this.p1mp.width - 640,this.p1mp.height -50],caption:"Dokumen BAST"});			
			this.sg12 = new saiGrid(this.pBAST1, {
				bound:[10,20,580,this.p1mp.height - 80],
				colCount:6, readOnly:true, 
				colTitle:"Kode Vendor, Nama Vendor, Tgl BAUT, No BAUT, Tgl BAST, No BAST",
				colWidth:[[5,4,3,2,1,0],[100,100,100,100,250,100]]
			});			   
			
			this.sg13 = new saiGrid(this.pBAST2, {
				bound:[10,20,this.pBAUT2.width - 20,this.p1mp.height - 80],
				colCount:1, readOnly:true, 
				colTitle:"Dokumen",
				colWidth:[[0],[370]]
			});			   
			this.pBAST.rearrangeChild(10,23);  
			//Tab 11
			this.pDisch = this.p1mp.childPage[11];			
			this.pDisch.no = new saiLabelEdit(this.pDisch,{bound:[10,10,200,20],readOnly:true, caption:"No Discharge"});
			this.pDisch.tgl = new saiLabelEdit(this.pDisch,{bound:[10,11,200,20],readOnly:true, caption:"Tanggal"});
			this.pDisch.nilai = new saiLabelEdit(this.pDisch,{bound:[10,12,200,20],readOnly:true, tipeText:ttNilai, caption:"Nilai"});
			this.sg14 = new saiGrid(this.pDisch, {
				bound:[10,20,this.pDisch.width - 20,this.p1mp.height - 80],
				colCount:1, readOnly:true, 
				colTitle:"Dokumen",
				colWidth:[[0],[370]]
			});			   
			this.pDisch.rearrangeChild(10,23);  
			this.pager = 50;
			this.userLogin="";					
			var sql =  "select count(distinct a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal, b.nama as nama_lok, c.nama as nama_obyek, d.nama as nama_sebab, a.nilai, e.nilai as nilai_adjust, f.nilai as nilai_bayar) "+
						" from tlk_klaim a inner join tlk_lokasi b on b.kode_lokasi = a.kode_lokasi and b.kode_lok = a.kode_lok and b.kode_ttg = a.kode_ttg "+
						"	inner join tlk_asuransi cc on cc.kode_asuransi = a.kode_asuransi and cc.kode_lokasi = a.kode_lokasi "+
						"	left outer join karyawan g on g.kode_lokasi = a.kode_lokasi and g.nik = a.nik_buat "+
						"	left outer join tlk_obyek c on c.kode_lokasi = a.kode_lokasi and c.kode_obyek = a.kode_obyek and c.kode_ttg = a.kode_ttg "+
						"	left outer join tlk_sebab d on d.kode_lokasi = a.kode_lokasi and d.kode_sebab = a.kode_sebab and d.kode_ttg = a.kode_ttg "+
						"	left outer join tlk_adjust e on e.kode_lokasi = a.kode_lokasi and e.no_klaim = a.no_klaim and e.status = '1' "+
						"	left outer join tlk_bayar f on f.kode_lokasi = a.kode_lokasi and f.no_klaim = a.no_klaim "+
						"where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' ";
		
			this.sqlCount = sql;
			this.rowCount = this.dbLib.getRowCount(sql, this.pager);
            this.sgn.setTotalPage(this.rowCount);            			
            this.sgn.rearrange();
            
            this.pFilter = new panel(this.p1mp.childPage[0],{bound:[20,20,500,235],caption:"Filter",				
				caption:"Filter by "
			});          
            
            this.bApply = new button(this.pFilter,{bound:[10,185,80,20],caption:"Apply",click:[this,"doClick"]});
			this.sgFilter = new saiGrid(this.pFilter,{bound:[10,25,this.pFilter.width - 30,150],colCount:4,rowCount:4,
				colTitle:["Filter","Type","Value1","Value2"],selectCell:[this,"doSelectFilterCell"],ellipsClick:[this,"doEllipsFilterClick"],change:[this,"sg1onChange"],
				colWidth:[[3,2,1,0],[100,100,60,150]], checkItem:true});
			this.sgFilter.columns.get(1).setButtonStyle(window.bsAuto);
			var val = new arrayMap({items:["All","=","Range","Like","<="]});			
			this.sgFilter.columns.get(1).setPicklist(val);
            this.pFilter.setTabChildIndex();
			this.sql = "select distinct a.no_klaim, a.no_dokumen, date_format(a.tanggal,'%d-%m-%Y') as tanggal, b.nama as nama_lok, c.nama as nama_obyek, d.nama as nama_sebab, a.nilai, e.nilai as nilai_adjust, f.nilai as nilai_bayar "+
						" from tlk_klaim a inner join tlk_lokasi b on b.kode_lokasi = a.kode_lokasi and b.kode_lok = a.kode_lok and b.kode_ttg = a.kode_ttg "+
						"	inner join tlk_asuransi cc on cc.kode_asuransi = a.kode_asuransi and cc.kode_lokasi = a.kode_lokasi "+
						"	left outer join karyawan g on g.kode_lokasi = a.kode_lokasi and g.nik = a.nik_buat "+
						"	left outer join tlk_obyek c on c.kode_lokasi = a.kode_lokasi and c.kode_obyek = a.kode_obyek and c.kode_ttg = a.kode_ttg "+
						"	left outer join tlk_sebab d on d.kode_lokasi = a.kode_lokasi and d.kode_sebab = a.kode_sebab and d.kode_ttg = a.kode_ttg "+
						"	left outer join tlk_adjust e on e.kode_lokasi = a.kode_lokasi and e.no_klaim = a.no_klaim and e.status = '1' "+
						"	left outer join tlk_bayar f on f.kode_lokasi = a.kode_lokasi and f.no_klaim = a.no_klaim "+
						"where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_ttg='"+this.app._kodeTtg+"' ";
			this.filter = "";
			this.doPager(this.sgn,1);			
			this.sgFilter.editData(0,["Periode","All","",""]);
			this.sgFilter.editData(1,["Jenis Asuransi","All","",""]);													
			this.sgFilter.editData(2,["Objek","All","",""]);													
			this.sgFilter.editData(3,["No Klaim","All","",""]);
			this.filterRep = new util_filterRep();			
			this.app._mainForm.pButton.hide();
			
		}catch(e){
			alert(e);
		}
	},
	doCellEnter: function(sender, col, row){
		if (sender == this.sg1mp){
			this.dbLib.getDataMultiDataProvider({items:[
				"",
			]});
		}
	},
	doToolBarClick: function(sender, id){
	   switch(id){
	       case "bFilter" :   
	           //this.pFilter.setVisible(!this.pFilter.visible);
	       break;
       }	   
    },	
    doClick: function(sender){
        try{
            if (sender == this.bApply){
                this.filter = this.filterRep.filterStr("a.periode",this.sgFilter.getCell(1,0),this.sgFilter.getCell(2,0),this.sgFilter.getCell(3,0),"and") +			    
						this.filterRep.filterStr("a.kode_asuransi",this.sgFilter.getCell(1,1),this.sgFilter.getCell(2,1),this.sgFilter.getCell(3,1),"and")+
						this.filterRep.filterStr("a.kode_obyek",this.sgFilter.getCell(1,2),this.sgFilter.getCell(2,2),this.sgFilter.getCell(3,2),"and")+
						this.filterRep.filterStr("a.no_klaim",this.sgFilter.getCell(1,3),this.sgFilter.getCell(2,3),this.sgFilter.getCell(3,3),"and");
				
    			this.rowCount = this.dbLib.getRowCount(this.sqlCount+this.filter, this.pager);				
				
                this.sgn.setTotalPage(this.rowCount);            			
                this.sgn.rearrange();
                
    	        this.doPager(this.sgn,1);		        
    	        //this.pFilter.hide();
            }            
       }catch(e){
            alert(e);
       }
    },
    
	doPager: function(sender,page){
	       this.activePage = page;
	       this.dbLib.getDataProviderPageA(this.sql+this.filter+" order by a.no_klaim ",page, this.pager);   			 
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
							for (var i in brg.rs.rows){
								line = brg.rs.rows[i];
								this.sg1mp.appendData([line.no_klaim, line.no_dokumen,line.tanggal,line.nama_lok, line.nama_obyek, line.nama_sebab, floatToNilai(line.nilai), floatToNilai(line.nilai_adjust), floatToNilai(line.nilai_bayar)]);
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
			//if (col === 2)
				//window.open("server/media/"+this.sg1mp2.getCell(1,row));
		}catch(e){
			alert(e);
		}
	},
	sg1onDblClick:function(sender, col, row){
		try{
			if (col < 9){
				if (this.trail2 === undefined){
					//uses("app_assetsap_dashboard_fLapView",true);
					//this.trail2 = new app_assetsap_dashboard_fLapView(this.owner,undefined, this);			
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
			
				var rs = this.dbLib.runSQL("select distinct periode from tlk_klaim where kode_lokasi='"+this.app._lokasi+"' order by periode desc ");			
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
			this.filterRep.ListDataSGFilter(this, "Data Jenis Asuransi",sender, sender.row, sender.col,
					"select a.kode_asuransi,a.nama from tlk_asuransi a "+
					"	inner join tlk_asuransi_ttg b on b.kode_lokasi = a.kode_lokasi and b.kode_asuransi = a.kode_asuransi "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_ttg = '"+this.app._kodeTtg+"' ",
					"select count(a.kode_asuransi) from tlk_asuransi a "+
					"	inner join tlk_asuransi_ttg b on b.kode_lokasi = a.kode_lokasi and b.kode_asuransi = a.kode_asuransi "+
					" where a.kode_lokasi = '"+this.app._lokasi+"' and b.kode_ttg = '"+this.app._kodeTtg+"' ",											  
					["a.kode_asuransi","a.nama"],"and",["No Asuransi","Keterangan"],false); 
		}
		if (row == 2)
		{
			this.filterRep.ListDataSGFilter(this, "Data Obyek Kerugian",sender, sender.row, sender.col,
					 "select kode_obyek, nama from tlk_obyek where kode_lokasi = '"+this.app._lokasi+"' and tipe='Posting' and kode_ttg='"+this.app._kodeTtg+"' "+this.filterRep.filterStr("kode_asuransi",sender.getCell(1,1),sender.getCell(2,1),sender.getCell(3,1)," and "),
					"select count(*) from tlk_obyek where kode_lokasi = '"+this.app._lokasi+"' and tipe='Posting' and kode_ttg='"+this.app._kodeTtg+"' "+this.filterRep.filterStr("kode_asuransi",sender.getCell(1,1),sender.getCell(2,1),sender.getCell(3,1)," and ") ,
					["kode_obyek","nama"],"and",["Kode Obyek","Nama"],false); 
		}	
		if (row == 3)
		{
			this.filterRep.ListDataSGFilter(this, "Data Klaim",sender, sender.row, sender.col,
					"select distinct no_klaim, keterangan from tlk_klaim a "+					
					this.filterRep.filterStr("kode_asuransi",sender.getCell(1,1),sender.getCell(2,1),sender.getCell(3,1)," where") +
					this.filterRep.filterStr("periode",sender.cells(1,0),sender.cells(2,0),sender.cells(3,0),"and")+
					this.filterRep.filterStr("kode_obyek",sender.cells(1,2),sender.cells(2,2),sender.cells(3,2),"and"),
					"select count(*) from tlk_klaim a "+					
					this.filterRep.filterStr("kode_asuransi",sender.getCell(1,1),sender.getCell(2,1),sender.getCell(3,1)," where") +
					this.filterRep.filterStr("periode",sender.cells(1,0),sender.cells(2,0),sender.cells(3,0),"and")+
					this.filterRep.filterStr("kode_obyek",sender.cells(1,2),sender.cells(2,2),sender.cells(3,2),"and"),
					["no_klaim","keterangan"],"and",["No Klaim","Keterangan"]);
		}		
	},
	doDetail: function(sender){
		var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
			"select nama from tlk_klaim_dok where no_klaim = '"+this.sg1mp.cells(0, this.sg1mp.row)+"' and kode_lokasi = '"+this.app._lokasi+"' order by nu",
			"select a.kode_ref, a.no_file, a.ket_dok, c.nama from tlk_dok_d a inner join tlk_dok_m b on b.no_dok = a.no_dok and b.kode_lokasi = a.kode_lokasi inner join tlk_ref c on c.kode_ref = a.kode_ref and c.kode_lokasi = a.kode_lokasi  where b.no_klaim = '"+this.sg1mp.cells(0, this.sg1mp.row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",
			"select a.nama from tlk_tuntutan_dok a inner join tlk_tuntutan b on b.no_tuntutan = a.no_tuntutan and b.kode_lokasi = a.kode_lokasi where b.no_klaim = '"+this.sg1mp.cells(0, this.sg1mp.row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by nu",
			"select a.nama from tlk_bantek_dok a inner join tlk_bantek b on b.no_bantek = a.no_bantek and b.kode_lokasi = a.kode_lokasi where b.no_klaim = '"+this.sg1mp.cells(0, this.sg1mp.row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by nu",
			"select b.no_survey, date_format(b.tanggal,'%d/%m/%Y') as tanggal , b.keterangan, case when b.status = '1' then 'Aktif' else 'Non Aktif' end as status, a.nama  from tlk_survey b left outer join tlk_survey_dok a  on b.no_survey = a.no_survey and b.kode_lokasi = a.kode_lokasi where b.no_klaim = '"+this.sg1mp.cells(0, this.sg1mp.row)+"' and b.kode_lokasi = '"+this.app._lokasi+"' order by nu",
			"select b.no_adjust, date_format(b.tanggal,'%d/%m/%Y') as tanggal, b.keterangan, b.nilai, b.nilai_dp, b.nilai_ddct, case when b.status = '1' then 'Aktif' else 'Non Aktif' end as status, a.nama  from tlk_adjust b left outer join tlk_adjust_dok a on b.no_adjust = a.no_adjust and b.kode_lokasi = a.kode_lokasi where b.no_klaim = '"+this.sg1mp.cells(0, this.sg1mp.row)+"' and b.kode_lokasi = '"+this.app._lokasi+"' order by nu",			
			"select a.nama  from tlk_penunjukan_dok a inner join tlk_penunjukan b on b.no_penunjukan = a.no_penunjukan and b.kode_lokasi = a.kode_lokasi where b.no_klaim = '"+this.sg1mp.cells(0, this.sg1mp.row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by nu",			
			"select a.kode_vendor, c.nama, a.tgl_spk, a.no_spk  from tlk_penunjukan_d a inner join tlk_vendor c on c.kode_vendor = a.kode_vendor and c.kode_lokasi = a.kode_lokasi  inner join tlk_penunjukan b on b.no_penunjukan = a.no_penunjukan and b.kode_lokasi = a.kode_lokasi where b.no_klaim = '"+this.sg1mp.cells(0, this.sg1mp.row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",			
			
			"select a.kode_vendor, d.nama, c.bobot from tlk_penunjukan_d a inner join tlk_pelaksanaan c on c.no_penunjukan = a.no_penunjukan and c.kode_vendor = a.kode_vendor inner join tlk_vendor d on d.kode_vendor = a.kode_vendor and d.kode_lokasi = a.kode_lokasi inner join tlk_penunjukan b on b.no_penunjukan = a.no_penunjukan and b.kode_lokasi = a.kode_lokasi where b.no_klaim = '"+this.sg1mp.cells(0, this.sg1mp.row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",
			"select a.nama from tlk_penunjukan_dok a inner join tlk_penunjukan b on b.no_penunjukan = a.no_penunjukan  where b.no_klaim = '"+this.sg1mp.cells(0, this.sg1mp.row)+"' and b.kode_lokasi = '"+this.app._lokasi+"' ",
			"select a.kode_vendor, c.nama, date_format(a.tanggal,'%d/%m/%Y') as tanggal, a.no_baut from tlk_baut a inner join tlk_vendor c on c.kode_vendor = a.kode_vendor and c.kode_lokasi = a.kode_lokasi  where a.no_klaim = '"+this.sg1mp.cells(0, this.sg1mp.row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",
			"select a.nama from tlk_baut_dok a inner join tlk_baut b on b.no_baut = a.no_baut   where b.no_klaim = '"+this.sg1mp.cells(0, this.sg1mp.row)+"' and b.kode_lokasi = '"+this.app._lokasi+"' ",
			"select a.kode_vendor, c.nama, date_format(a.tanggal,'%d/%m/%Y') as tanggal, a.no_baut, date_format(e.tanggal,'%d/%m/%Y') as tgl, d.no_bast from tlk_baut a inner join tlk_bast_d d on d.no_baut = a.no_baut inner join tlk_bast e on e.no_bast = d.no_bast and e.kode_lokasi = a.kode_lokasi inner join tlk_vendor c on c.kode_vendor = a.kode_vendor and c.kode_lokasi = a.kode_lokasi where e.no_klaim = '"+this.sg1mp.cells(0, this.sg1mp.row)+"' and e.jenis = 'FUL'  and a.kode_lokasi = '"+this.app._lokasi+"' ",
			"select a.nama from tlk_bast_dok a inner join tlk_bast b on b.no_bast = a.no_bast where b.no_klaim = '"+this.sg1mp.cells(0, this.sg1mp.row)+"' and b.kode_lokasi = '"+this.app._lokasi+"' and b.jenis = 'FUL'",
			"select a.no_bayar, a.nilai, b.nama, date_format(a.tanggal,'%d/%m/%Y') as tanggal from tlk_bayar a inner join tlk_bayar_dok b on b.no_bayar = a.no_bayar and b.kode_lokasi=a.kode_lokasi where a.no_klaim = '"+this.sg1mp.cells(0, this.sg1mp.row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' "
		]}),true);		
		if (data){
			try{
				var tmp = data.result[0].rs.rows;
				this.sg2.clear();
				for (var i in tmp){
					this.sg2.appendData([tmp[i].nama]);
				}
				tmp = data.result[1].rs.rows;				
				this.sg3.clear();
				for (var i in tmp){				
					this.sg3.appendData([tmp[i].kode_ref, tmp[i].nama, tmp[i].no_file,tmp[i].ket_dok]);
				}				
				tmp = data.result[2].rs.rows;			
				this.sg4.clear();
				for (var i in tmp){
					this.sg4.appendData([tmp[i].nama]);
				}				
				tmp = data.result[3].rs.rows;				
				this.sg41.clear();
				for (var i in tmp){
					this.sg41.appendData([tmp[i].nama]);
				}
				tmp = data.result[4].rs.rows;				
				if (tmp[0]){
					this.pSurvey.no.setText(tmp[0].no_survey);
					this.pSurvey.tgl.setText(tmp[0].tanggal);
					this.pSurvey.ket.setText(tmp[0].keterangan);
					this.pSurvey.status.setText(tmp[0].status);					
				}
				this.sg5.clear();
				for (var i in tmp){
					this.sg5.appendData([tmp[i].nama]);
				}				
				tmp = data.result[5].rs.rows;
				if (tmp[0]){
					this.pAdjust.no.setText(tmp[0].no_adjust);
					this.pAdjust.tgl.setText(tmp[0].tanggal);
					this.pAdjust.ket.setText(tmp[0].keterangan);
					this.pAdjust.status.setText(tmp[0].status);
					this.pAdjust.nilai.setText(floatToNilai(tmp[0].nilai_dp));
					this.pAdjust.nilai2.setText(floatToNilai(tmp[0].nilai));
					this.pAdjust.nilai3.setText(floatToNilai(tmp[0].nilai_ddct));			
				}
				this.sg51.clear();
				for (var i in tmp){
					this.sg51.appendData([tmp[i].nama]);
				}
				tmp = data.result[7].rs.rows;
				this.sg7.clear();
				for (var i in tmp){
					this.sg7.appendData([tmp[i].kode_vendor, tmp[i].nama, tmp[i].no_spk, tmp[i].tgl_spk]);
				}
				tmp = data.result[6].rs.rows;
				this.sg6.clear();
				for (var i in tmp){
					this.sg6.appendData([tmp[i].nama]);
				}
				tmp = data.result[8].rs.rows;
				this.sg8.clear();
				for (var i in tmp){
					this.sg8.appendData([tmp[i].kode_vendor, tmp[i].nama, tmp[i].bobot]);
				}
				tmp = data.result[9].rs.rows;
				this.sg9.clear();
				for (var i in tmp){
					this.sg9.appendData([tmp[i].nama]);
				}
				tmp = data.result[10].rs.rows;
				this.sg10.clear();
				for (var i in tmp){
					this.sg10.appendData([tmp[i].kode_vendor, tmp[i].nama, tmp[i].tanggal, tmp[i].no_baut]);
				}
				tmp = data.result[11].rs.rows;
				this.sg11.clear();
				for (var i in tmp){
					this.sg11.appendData([tmp[i].nama]);
				}
				tmp = data.result[12].rs.rows;
				this.sg12.clear();
				for (var i in tmp){
					this.sg12.appendData([tmp[i].kode_vendor, tmp[i].nama, tmp[i].tanggal, tmp[i].no_baut, tmp[i].tgl, tmp[i].no_bast]);
				}
				tmp = data.result[13].rs.rows;
				this.sg13.clear();
				for (var i in tmp){
					this.sg13.appendData([tmp[i].nama]);
				}
				tmp = data.result[14].rs.rows;
				if (tmp[0]){
					this.pDisch.tgl.setText(tmp[0].tanggal);
					this.pDisch.no.setText(tmp[0].no_bayar);
					this.pDisch.nilai.setText(floatToNilai(tmp[0].nilai));
				}
				this.sg14.clear();
				for (var i in tmp){
					this.sg14.appendData([tmp[i].nama]);
				}
			}catch(e){
				alert(e);
			}
		}
	}
});
