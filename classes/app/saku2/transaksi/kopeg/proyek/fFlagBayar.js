window.app_saku2_transaksi_kopeg_proyek_fFlagBayar = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_proyek_fFlagBayar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_proyek_fFlagBayar";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Flag Pembayaran Project: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Project","Detail Project","Filter Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:10,tag:0,		            
					colTitle:["No Piutang","No Dokumen","Tanggal","ID Project","No SPK/PKS","PP","Customer","Nama Project","Nilai","PPN"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,100,250,200,150,200,100,80,200,100]],
					readOnly:true,colFormat:[[8,9],[cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"No Bukti",readOnly:true,tag:1});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]}); 
		this.e_dok = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,300,20],caption:"No Dokumen", maxLength:100,tag:1});						
		this.e_ket = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,500,20],caption:"Deskripsi", maxLength:150,tag:1});												
		
		this.e_nopiutang = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"No Piutang", readOnly:true ,tag:1});										
		this.e_nodok = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"No Dok Tagihan", readOnly:true ,tag:1});										
		this.e_tgltagih = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,500,20],caption:"Tgl Tagihan", readOnly:true ,tag:1});										
		this.e_cust = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,500,20],caption:"Customer", readOnly:true ,tag:1});										
		this.e_id = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,500,20],caption:"ID/Dok Project ", readOnly:true ,tag:1});										
		this.e_nama = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,500,20],caption:"Nama Project ", readOnly:true ,tag:1});								
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Nilai", tag:1, tipeText:ttNilai, text:"0",readOnly:true,tag:1});				
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0",readOnly:true,tag:1});				
		
		this.cb_cust2 = new portalui_saiCBBL(this.pc1.childPage[2],{bound:[20,15,200,20],caption:"Customer",multiSelection:false,tag:9});
		this.bCari = new button(this.pc1.childPage[2],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
				
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		this.pc1.childPage[2].rearrangeChild(10, 23);			
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
				
			this.cb_cust2.setSQL("select kode_cust, nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Cust",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_proyek_fFlagBayar.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_proyek_fFlagBayar.implement({	
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{					
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();															
					sql.add("insert into pr_appbayar_m(no_app,kode_lokasi,tanggal,periode,tgl_input,no_piutang,nik_user) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"',getdate(),'"+this.e_nopiutang.getText()+"','"+this.app._userLog+"')");					
					sql.add("update pr_piutang_m set no_app='"+this.e_nb.getText()+"' where no_piutang='"+this.e_nopiutang.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					this.dbLib.execArraySQL(sql);
					setTipeButton(tbAllFalse);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);							
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :									
			    this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;							
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}			
		this.doLoad();				
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.doLoad();
			this.standarLib.clearByTag(this, new Array("1"),undefined);							
			setTipeButton(tbAllFalse);			
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" ) {				
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pr_appbayar_m","no_app",this.app._lokasi+"-APP"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_dok.setFocus();
			setTipeButton(tbSimpan);				
		}		
	},	
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {							
				this.doClick();
				this.pc1.setActivePage(this.pc1.childPage[1]);																		
				this.e_dok.setText("-");
				
				this.e_nopiutang.setText(this.sg1.cells(0,row));
				this.e_nodok.setText(this.sg1.cells(1,row));
				this.e_tgltagih.setText(this.sg1.cells(2,row));
				this.e_cust.setText(this.sg1.cells(6,row));
				this.e_id.setText(this.sg1.cells(3,row) + " - " +this.sg1.cells(4,row));
				this.e_nama.setText(this.sg1.cells(7,row));
				this.e_nilai.setText(this.sg1.cells(8,row));
				this.e_ppn.setText(this.sg1.cells(9,row));						
			}
		} catch(e) {alert(e);}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){																					
							this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ptg='"+this.e_nb.getText()+"' ";							
							this.filter = this.filter2;
							this.viewer.prepare();
							this.viewer.setVisible(true);
							this.app._mainForm.pButton.setVisible(false);
							this.app._mainForm.reportNavigator.setVisible(true);
							this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
							this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
							this.app._mainForm.reportNavigator.rearrange();
							this.showFilter = undefined;
							this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
							this.page = 1;
							this.allBtn = false;
							this.pc1.hide();														
						}else system.info(this,result,"");
	    			break;																				
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);							
			this.doLoad();
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			setTipeButton(tbAllFalse);			
		} catch(e) {
			alert(e);
		}
	},	
	doLoad:function(sender){										
		var strSQL = "select b.no_piutang,b.no_dokumen,c.no_proyek,c.kode_cust+' - '+d.nama as cust,c.no_dokumen as no_spk,a.nilai-a.nilai_ppn as nilai,a.nilai_ppn,c.kode_pp+' - '+e.nama as pp,c.keterangan,convert(varchar,b.tanggal,103) as tanggal,b.keterangan "+
		             "from pr_piutang_d a "+
					 "     inner join pr_piutang_m b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
					 "     inner join pr_proyek_m c on b.no_proyek=c.no_proyek and b.kode_lokasi=c.kode_lokasi "+
					 "	   inner join cust d on c.kode_cust=d.kode_cust and c.kode_lokasi=d.kode_lokasi "+
					 "     inner join pp e on c.kode_pp =e.kode_pp and c.kode_lokasi=e.kode_lokasi "+
					 "where b.periode<='"+this.e_periode.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' and b.no_app='-'";							 
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);					
	},		
	doCari:function(sender){						
		var strSQL = "select b.no_piutang,b.no_dokumen,c.no_proyek,c.kode_cust+' - '+d.nama as cust,c.no_dokumen as no_spk,a.nilai-a.nilai_ppn as nilai,a.nilai_ppn,c.kode_pp+' - '+e.nama as pp,c.keterangan,convert(varchar,b.tanggal,103) as tanggal,b.keterangan "+
		             "from pr_piutang_d a "+
					 "     inner join pr_piutang_m b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
					 "     inner join pr_proyek_m c on b.no_proyek=c.no_proyek and b.kode_lokasi=c.kode_lokasi "+
					 "	   inner join cust d on c.kode_cust=d.kode_cust and c.kode_lokasi=d.kode_lokasi "+
					 "     inner join pp e on c.kode_pp =e.kode_pp and c.kode_lokasi=e.kode_lokasi "+
					 "where d.kode_cust ='"+this.cb_cust2.getText()+"' and b.periode<='"+this.e_periode.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' and b.no_app='-'";							 
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);					
	},
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];								
			this.sg1.appendData([line.no_piutang,line.no_dokumen,line.tanggal,line.no_proyek,line.no_spk,line.pp,line.cust,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.nilai_ppn)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}	
});