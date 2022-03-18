window.app_saku_addon_fp_fpajakk = function(owner)
{
	if (owner)
	{
		window.app_saku_addon_fp_fpajakk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_addon_fp_fpajakk";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Faktur Pajak Standar", 0);	
		
		uses("util_gridLib");this.gridLib=new util_gridLib();
		uses("portalui_checkBox;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.cb_nb = new portalui_saiCBBL(this,{bound:[20,10,250,20],caption:"No Faktur",btnClick:[this,"doBtnClick"],rightLabelVisible:false});
		this.bLoad = new portalui_imageButton(this,{bound:[275,10,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_cust = new portalui_saiCBBL(this,{bound:[20,12,200,20],caption:"Pelanggan",btnClick:[this,"doBtnClick"], radOnly:true});
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,13,200,20],caption:"Pejabat",btnClick:[this,"doBtnClick"], radOnly:true});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,14,300,20],caption:"Invoice", maxLength:100});		
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,15,503,20],caption:"Keterangan", maxLength:150});				
		this.cb_status = new portalui_saiCB(this,{bound:[20,16,250,20],caption:"Status",items:["Harga Jual","Penggantian","Uang Muka","Termijn","Harga Jual/Penggantian"]});
		this.e_ppn = new portalui_saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nilai PPN",tipeText:ttNilai,alignment:alLeft, readOnly:true, text:"0"});
		this.e_total = new portalui_saiLabelEdit(this,{bound:[323,17,200,20],caption:"Nilai DPP",tipeText:ttNilai,alignment:alLeft, readOnly:true, text:"0"});
		this.e_disk = new portalui_saiLabelEdit(this,{bound:[20,18,200,20],caption:"Nilai Diskon",tipeText:ttNilai,alignment:alLeft, text:"0"});
		this.e_um = new portalui_saiLabelEdit(this,{bound:[323,18,200,20],caption:"Uang Muka",tipeText:ttNilai,alignment:alLeft, text:"0"});
		
		this.p1 = new portalui_panel(this,{bound:[20,19,500,270],caption:"Data Barang-Jasa Kena Pajak"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,500,220],colCount:2,tag:9,colTitle:["Barang - Jasa","Nilai"],
					colWidth:[[0,1],[350,100]], colFormat:[[1],[cfNilai]],defaultRow:1,nilaiChange:[this, "doSgChange"]});				
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,240,500,25],buttonStyle:1,grid:this.sg});
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[440,5,100,25],caption:"Preview",selected:true});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbUbahHapus);
		this.maximize();
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.width, this.height],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		this.setTabChildIndex();
		
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_addon_fp_fpajakk.extend(window.portalui_childForm);
window.app_saku_addon_fp_fpajakk.implement({
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
	ubah: function(){			
		try{		
			this.periode = this.dp_d1.year+''+(this.dp_d1.month<10?'0'+this.dp_d1.month:this.dp_d1.month);
			if (this.standarLib.checkEmptyByTag(this, [0]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("delete from fp_invoice where no_faktur = '"+this.cb_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add("delete from fp_invoice_d where no_faktur = '"+this.cb_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					
					sql.add("insert into fp_invoice(no_faktur,tanggal,periode,kode_lokasi,kode_cust,nilai_dpp,nik_app,progress,keterangan,nik_user,tgl_input,status,no_invoice, nilai_ppn,nilai_diskon,nilai_um)values" +
						"	('"+this.cb_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.periode+"','"+this.app._lokasi+"','"+this.cb_cust.getText()+"',"+parseNilai(this.e_total.getText())+",'"+
						this.cb_app.getText()+"','0','"+this.e_desc.getText()+"','"+this.app._userLog+"',now(),'"+this.cb_status.getText()+"','"+this.e_dok.getText()+"',"+parseNilai(this.e_ppn.getText())+","+parseNilai(this.e_disk.getText())+","+parseNilai(this.e_um.getText())+")");										
					
					for (var i=0; i < this.sg.rows.getLength(); i++)
					{			
						if (this.sg.rowValid(i))
						  sql.add("insert into fp_invoice_d (no_faktur,nu,keterangan,nilai,kode_lokasi) values "+	
							      "('"+this.cb_nb.getText()+"',"+i+",'"+this.sg.getCell(0,i)+"',"+parseNilai(this.sg.getCell(1,i))+",'"+this.app._lokasi+"')");
					}		
					this.dbLib.execArraySQL(sql);
					//this.viewer.show();
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from fp_invoice where no_faktur = '"+this.cb_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					sql.add("delete from fp_invoice_d where no_faktur = '"+this.cb_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");					
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		this.event=event;
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","9"),this.cb_nb);		
					this.sg.clear(1);
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" : this.hapus();			
				break;
		}
	},
	doLoadClick: function(sender){
	try{
		if (this.cb_nb.getText() != ""){
			var data = this.dbLib.getDataProvider("select a.tanggal,a.kode_cust,b.nama as nama_cust,a.nik_app,c.nama as nama_app,a.no_invoice,a.keterangan,a.status,a.nilai_dpp,a.nilai_ppn,a.nilai_diskon,a.nilai_um "+
 			           "from fp_invoice a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
					   "                  inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi "+
					   "where a.no_faktur='"+this.cb_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined)
				{
					this.dp_d1.setText(line.tanggal);
					this.cb_cust.setText(line.kode_cust,line.nama_cust);
					this.cb_app.setText(line.nik_app,line.nama_app);
					this.e_dok.setText(line.no_invoice);
					this.e_desc.setText(line.keterangan);
					this.cb_status.setText(line.status);
					this.e_total.setText(floatToNilai(parseFloat(line.nilai_dpp)));
					this.e_ppn.setText(floatToNilai(parseFloat(line.nilai_ppn)));
					this.e_disk.setText(floatToNilai(parseFloat(line.nilai_diskon)));
					this.e_um.setText(floatToNilai(parseFloat(line.nilai_um)));
				}
			}
			this.sg.clear(); 
			/*
			var strSql = "select keterangan,nilai from fp_invoice_d where no_faktur='"+this.cb_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' order by nu";									 
			var data = this.dbLib.runSQL(strSql);
			if (data instanceof portalui_arrayMap)
			{
				if (data.get(0) != undefined)
				{									
					for (var i in data.objList)
					{
						line = data.get(i);
						this.gridLib.SGAppendData(this.sg,new Array(0,1),
							new Array(line.get("keterangan"),nilaiToFloat(line.get("nilai"))));					
					}
					this.sg.validasi();
				} 
			}
			*/
			var strSQL = "select keterangan,nilai from fp_invoice_d where no_faktur='"+this.cb_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' order by nu";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){				
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.keterangan,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);
		}
	}catch(e){
		systemAPI.alert(e);
	}
	},
	doBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_nb) 
			{   
			    this.standarLib.showListData(this, "Daftar Faktur Pajak",sender,undefined, 
											  "select no_faktur, no_invoice  from fp_invoice where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(no_faktur)       from fp_invoice where kode_lokasi='"+this.app._lokasi+"'",
											  ["no_faktur","no_invoice"],"and",["No Faktur","No Invoice"],false);				
			}
			if (sender == this.cb_cust) 
			{   
			    this.standarLib.showListData(this, "Daftar Pelanggan",sender,undefined, 
											  "select kode_cust, nama, npwp, alamat2  from cust where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_cust) from cust where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_cust","nama","npwp","alamat2"],"and",["Kode Plg","Nama","NPWP","Alamat NPWP"],false);				
			}
			if (sender == this.cb_app) 
			{   
			    this.standarLib.showListData(this, "Daftar Pejabat",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.periode = y+""+m;
	},
	doSgChange: function(sender, col, row){
		var tot = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if (this.sg.cells(1,i) != "")
				tot += nilaiToFloat(this.sg.cells(1,i));
		}
		
		this.e_total.setText(floatToNilai(tot));
		var ppn = Math.round(10/100 * tot);
		this.e_ppn.setText(floatToNilai(ppn));

	},
	doRequestReady: function(sender, methodName, result){
		try{
			if (sender == this.dbLib)
			{
				try
				{   
					switch(methodName)
		    		{
		    			case "execArraySQL" :	    				
							if (result.toLowerCase().search("error") == -1)					
							{
								this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan ( No : "+ this.cb_nb.getText()+")");							
								if (this.event==="ubah"){
									var periode = this.dp_d1.year+''+(this.dp_d1.month<10?'0'+this.dp_d1.month:this.dp_d1.month);
									this.nama_report="server_report_saku2_frigia_rptFaktur";
									this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+periode+"' and a.no_faktur='"+this.cb_nb.getText()+"' ";
									this.filter2 = "Semua";
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
								}else this.app._mainForm.bClear.click();
							}else system.info(this,result,"");
		    			break;
		      		break;
		    		}    		
				}
				catch(e)
				{
					systemAPI.alert("step : "+step+"; error = "+e);
				}
		    }			
			if (methodName === "preview"){
				this.viewer.preview(result);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doCloseReportClick: function(sender)
	{
		switch(sender.getName())
		{
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1,this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1,this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
			break;
		}
	}
});