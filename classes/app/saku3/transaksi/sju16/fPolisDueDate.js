window.app_saku3_transaksi_sju16_fPolisDueDate = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sju16_fPolisDueDate.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fPolisDueDate";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Edit PPW Polis", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});						
		this.l_tgl1 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,12,100,18],selectDate:[this,"doSelectDate"]});		
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,430], childPage:["Filter Cari","Polis Baru","Data Penanggung","Termin Tagihan"]});
		this.cb_cust2 = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Tertanggung",tag:9,multiSelection:false,change:[this,"doChange"]}); 		
		this.cb_tipe2 = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"COB",tag:9,multiSelection:false,change:[this,"doChange"]}); 			
		this.cb_reg = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"No Register",tag:2,multiSelection:false}); 		
		this.bCari = new button(this.pc1.childPage[0],{bound:[120,10,80,18],caption:"Load Data",click:[this,"doCari"]});			
		
		this.e_jenis = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,450,20],caption:"Jenis Polis", readOnly:true,visible:false});
   	    this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"No Polis", maxLength:50,readOnly:true});						
		this.e_dok2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,450,20],caption:"No Sertifikat", maxLength:50,readOnly:true});						
		this.e_noplacing = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"No Placing", readOnly:true});
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,11,200,20],caption:"Tgl Placing", readOnly:true});				
		this.e_noquo = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"No Quotation", readOnly:true});
		this.e_vendor = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,450,20],caption:"Png (Leader)", readOnly:true});
		this.e_cust = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"Tertanggung", readOnly:true});
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,12,450,20],caption:"Segmen", readOnly:true});
		this.e_pic = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Acc Exec", readOnly:true});
		this.e_occup = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Occup. of Risk", readOnly:true});
		this.e_lokasi = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Loc. of Risk",readOnly:true});						
		this.e_objek = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Object of Risk",readOnly:true});	
		this.e_cover = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Coverage",readOnly:true});
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Period of Insurance", underline:true});
		this.dp_mulai = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,100,18]}); 		
		this.dp_selesai = new portalui_datePicker(this.pc1.childPage[1],{bound:[370,11,100,18]}); 				
		this.c_curr = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Currency",readOnly:true,tag:2});		
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,14,200,20],caption:"Sum Insured", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_ppremi = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"% Premi", tag:1, tipeText:ttNilai, text:"0",readOnly:true});    
		this.e_npremi = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,16,200,20],caption:"Nilai Premi", tag:1, tipeText:ttNilai, text:"0",readOnly:true}); 
		this.e_pfee = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"% Brokerage", tag:1, tipeText:ttNilai, text:"0",readOnly:true});  
		this.e_nfee = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,17,200,20],caption:"Brokerage", tag:1, tipeText:ttNilai, text:"0",readOnly:true});   				
		this.e_ndiskon = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Nilai Diskon", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"],readOnly:true});		
		this.e_npcost = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,16,200,20],caption:"Polis Cost", tag:1, tipeText:ttNilai, text:"0",readOnly:true});								
		this.e_nmat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Bea Materai", tag:1, tipeText:ttNilai, text:"0",readOnly:true});						
		
		this.sg31 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:13,tag:0,
		            colTitle:["Kode","Nama Penanggung","Status"," % ","SumInsured","Premi","Brokerage","PPN","PPh",	"Tot.Termin Premi","Tot. Termin Brokrg","Tot. Termin PPN","Tot. Termin PPh"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,100,   80,80,100,100,100,60,80,250,80]],					
					colFormat:[[3,4,5,6,7,8,9,10,11,12],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],					
					change:[this,"doChangeCell31"],readOnly:true,
					autoAppend:false,defaultRow:1}); 
		this.sgn31 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg31});		

		this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:15,tag:0,
		            colTitle:["Ke-","Kode Png","Nama Penanggung","Tgl Invoice","PPW Polis","No Polis / Keterangan","Premi","Brokerage","PPN","PPh","Discount","P. Cost","Materai","Total Premi","Idx"],
					colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[50,100,80,80,80,80,80,80,80,190,80,80,150,70,40]],																		
					columnReadOnly:[true,[0,1,2,5,6,7,8,9,10,11,12,13,14],[3,4]],
					buttonStyle:[[3,4],[bsDate,bsDate]], 
					colFormat:[[6,7,8,9,10,11,12,13],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					change:[this,"doChangeCell2"],										
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);			
		this.setTabChildIndex();		
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.c_curr.setText("IDR");						
			
			this.cb_tipe2.setSQL("select kode_tipe, nama from sju_tipe where kode_lokasi='"+this.app._lokasi+"'",["kode_tipe","nama"],false,["Kode","Nama"],"and","Data Tipe",true);			
			this.cb_cust2.setSQL("select a.kode_cust, a.nama from sju_cust a "+
							    "inner join karyawan_pp b on a.kode_segmen=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
								"where a.kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);									
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sju16_fPolisDueDate.extend(window.childForm);
window.app_saku3_transaksi_sju16_fPolisDueDate.implement({
	doChange:function(sender){		
		try {			
			if (sender == this.cb_cust2 || sender == this.cb_tipe2) {			
				if (this.cb_cust2.getText() == "") var filter = " ";
				else filter = " a.kode_cust='"+this.cb_cust2.getText()+"' and ";
				
				if (this.cb_tipe2.getText() == "") var filter = " ";
				else filter = filter+" a.kode_tipe='"+this.cb_tipe2.getText()+"' and ";

				this.cb_reg.setSQL("select a.no_polis, a.no_dok+' | '+no_dok2 as no_dok "+
									 "from sju_polis_m a "+
									 "where "+filter+" a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["no_polis","no_dok"],false,["No Register","No Polis"],"and","Data Polis",true);
			}
		}
		catch(e) {
			alert(e);
		}
	},	
	doCari:function(sender){			
		if (this.cb_reg.getText() != "") {
			var strSQL = "select b.no_placing,c.no_quo,convert(varchar,b.tanggal,103) as tgl_placing,e.kode_vendor+' | '+e.nama as vendor, f.kode_cust+' | '+f.nama as cust,g.kode_pp+' | '+g.nama as pp,h.kode_pic+' | '+h.nama as pic, "+
						 "     a.tgl_mulai,a.tgl_selesai,a.kode_curr,a.total,a.n_premi,a.n_fee,a.p_premi,a.p_fee, "+
						 "	   b.jenis,a.occup,a.lokasi,a.objek, a.kode_tipe,a.kode_pp,a.kode_pic,a.kode_cust, "+
						 "	   a.no_dok,a.no_dok2,a.p_cost as rekap_cost,a.diskon as rekap_diskon,a.materai as rekap_mat,a.tanggal as tgl_polis,a.cover "+
						 "from sju_polis_m a "+
						 "		inner join sju_placing_m b on a.no_placing=b.no_placing and a.kode_lokasi=b.kode_lokasi "+
						 "      inner join sju_quo_m c on b.no_placing=c.no_placing and b.kode_lokasi=c.kode_lokasi "+
						 "		inner join sju_polis_vendor d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi and d.status='LEADER' "+
						 "		inner join sju_vendor e on d.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi "+
						 "		inner join sju_cust f on a.kode_cust=f.kode_cust and a.kode_lokasi=f.kode_lokasi "+
						 "		inner join pp g on a.kode_pp=g.kode_pp and a.kode_lokasi=g.kode_lokasi "+
						 "      inner join karyawan_pp q on g.kode_pp=q.kode_pp and g.kode_lokasi=q.kode_lokasi and q.nik='"+this.app._userLog+"' "+
						 "		inner join sju_pic h on a.kode_pic=h.kode_pic and a.kode_lokasi=h.kode_lokasi "+
						 "where a.no_polis='"+this.cb_reg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){																								
					this.e_noplacing.setText(line.no_placing);
					this.e_noquo.setText(line.no_quo);
					this.e_tgl.setText(line.tgl_placing);
					this.e_vendor.setText(line.vendor);
					this.e_cust.setText(line.cust);
					this.e_pp.setText(line.pp);			
					this.e_pic.setText(line.pic);
					this.dp_mulai.setText(line.tgl_mulai);
					this.dp_selesai.setText(line.tgl_selesai);
					this.c_curr.setText(line.kode_curr);
					this.e_total.setText(floatToNilai(line.total));
					this.e_npremi.setText(floatToNilai(line.n_premi));
					this.e_nfee.setText(floatToNilai(line.n_fee));
					this.e_ppremi.setText(floatToNilai(line.p_premi));
					this.e_pfee.setText(floatToNilai(line.p_fee));
					this.e_jenis.setText(line.jenis);
					this.e_occup.setText(line.occup);
					this.e_lokasi.setText(line.lokasi);
					this.e_objek.setText(line.objek);

					this.dp_d1.setText(line.tgl_polis);
					this.e_dok.setText(line.no_dok);
					this.e_dok2.setText(line.no_dok2);
					this.e_cover.setText(line.cover);
					
					this.e_npcost.setText(floatToNilai(line.rekap_cost));
					this.e_nmat.setText(floatToNilai(line.rekap_mat));						
					this.e_ndiskon.setText(floatToNilai(line.rekap_diskon));
					this.e_npcost.setText(floatToNilai(line.rekap_cost));
					this.e_nmat.setText(floatToNilai(line.rekap_mat));

					this.kode_tipe = line.kode_tipe;
					this.kode_pp = line.kode_pp;
					this.kode_pic = line.kode_pic;
					this.kodeCust = line.kode_cust;	
				}
			}
			
			var strSQL = "select b.kode_vendor,b.nama,a.persen,a.total,a.n_premi,a.n_fee,a.status "+
						 "from sju_polis_vendor a inner join sju_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
						 "where a.no_polis = '"+this.cb_reg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.status";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg31.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					var ppn = Math.round((this.persenPPN *  parseFloat(line.n_fee) / 100) * 100)/100;
					var pph = Math.round((this.persenPPh *  parseFloat(line.n_fee) / 100) * 100)/100;
					this.sg31.appendData([line.kode_vendor,line.nama,line.status,floatToNilai(line.persen),floatToNilai(line.total),floatToNilai(line.n_premi),floatToNilai(line.n_fee),ppn,pph,"0","0","0","0"]);
				}
			} else this.sg31.clear(1);	
			
			var strSQL = "select a.nu,a.ke,a.kode_vendor,b.nama,a.no_polis,a.nu,a.keterangan,a.premi,a.fee,a.diskon,a.p_cost,convert(varchar,a.tgl_bill,103) as tgl_bill,convert(varchar,a.due_date,103) as due_date,a.ppn,a.pph,a.materai,a.premi-a.diskon+a.p_cost+a.materai as total "+					
						 "from sju_polis_termin a inner join sju_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+				
						 "where a.no_polis = '"+this.cb_reg.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.sg2.appendData([line.ke,line.kode_vendor,line.nama,line.tgl_bill,line.due_date,line.keterangan,floatToNilai(line.premi),floatToNilai(line.fee),floatToNilai(line.ppn),floatToNilai(line.pph),floatToNilai(line.diskon),floatToNilai(line.p_cost),floatToNilai(line.materai),floatToNilai(line.total),line.nu]);
				}														
			} else this.sg2.clear(1);
					
		}	
		this.pc1.setActivePage(this.pc1.childPage[1]);	
		this.doClick();	
	},		
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
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){																
								sql.add("update sju_polis_termin set due_date = '"+this.sg2.getCellDateValue(4,i)+"' "+
										"where  no_polis='"+this.cb_reg.getText()+"' and nu="+this.sg2.cells(14,i)+" ");
							}							
						}
					}															
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg2.clear(1); this.sg31.clear(1);  						
					this.pc1.setActivePage(this.pc1.childPage[0]);							
					setTipeButton(tbSimpan);
				break;
			case "simpan" :																											
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;									
		}
	},								
	doChangeCell2: function(sender, col, row){	
		try {		
			if (col == 3) {
				var strSQL = "select convert(varchar, dateadd(day,7,'"+this.sg2.getCellDateValue(3,row)+"'), 103) as jth_tempo";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.sg2.cells(4,row,line.jth_tempo);
					}
				}
			}			    						
		}
		catch(e) {
			alert(e);
		}
	},				
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan.");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});