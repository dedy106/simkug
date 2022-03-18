window.app_saku3_transaksi_sju16_fDNpromo = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sju16_fDNpromo.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fDNpromo";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form DN Biaya Promosi", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal DN", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Entry Data","List Transaksi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["Nomor DN","Tanggal","Tahun Pajak","Keterangan","Jumlah"],
					colWidth:[[4,3,2,1,0],[100,300,100,100,100]],					
					colFormat:[[4],[cfNilai]],					
					readOnly:true,dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Nomor DN",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_aju = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Yang Mengajukan", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_tahu = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"Atasan", multiSelection:false, maxLength:10, tag:2});
		this.e_jabat = new saiCBBL(this.pc2.childPage[0],{bound:[20,19,220,20],caption:"Pejabat Berwenang", multiSelection:false, maxLength:10, tag:2});
		this.e_tahun = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,200,20],caption:"Tahun Pajak", maxLength:4, readOnly:true, tipeText:ttAngka});				

		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,12,990,277], childPage:["Data Penerima","Data Keuangan"]});
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18]}); 		
		this.c_kateg = new saiCB(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Kategori",items:["TERTANGGUNG","NON"], readOnly:true,tag:2,change:[this,"doChange"]});				
		this.e_namattg = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Tertanggung", multiSelection:false, maxLength:10, tag:9,change:[this,"doChange"]});
		this.e_namanon = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,450,20],caption:"Nama", maxLength:100,tag:9,visible:false});					
		this.e_npwp = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"NPWP", maxLength:50});					
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,450,20],caption:"Alamat", maxLength:200});					
		this.e_jenis = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"Jenis Biaya", maxLength:100});					
		this.e_jumlah = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Jumlah", tag:1, tipeText:ttNilai, text:"0"});				
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,450,20],caption:"Keterangan", maxLength:100});					
		
		this.e_persen = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,200,20],caption:"Persen PPh (%)", tag:2, tipeText:ttNilai, text:"2"});
		this.i_persen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,18,20,20],hint:"Hitung PPh",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitung"]});		
		this.e_pph = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Jumlah PPh", tag:1, tipeText:ttNilai, text:"0"});
		this.i_nilai = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,15,20,20],hint:"Hitung Persen",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitung"]});		
		this.e_nopot = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"No Bukti Pot.", maxLength:50});									
		this.e_nobayar = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"No Bukti Pmbyrn", maxLength:50});									

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);				
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
				
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.e_aju.setSQL("select nik,nama from karyawan where flag_aktif = '1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.e_jabat.setSQL("select nik,nama from karyawan where flag_aktif = '1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.e_namattg.setSQL("select kode_cust,nama from sju_cust where  kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);
			
			this.cb_tahu.setSQL("select nik,nama from karyawan where flag_aktif = '1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			// this.cb_bdh.setSQL("select nik,nama from karyawan where flag_aktif = '1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			
			this.e_aju.setText(this.app._userLog);
			this.e_jabat.setText("000027");
			// this.cb_bdh.setText("800703");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sju16_fDNpromo.extend(window.childForm);
window.app_saku3_transaksi_sju16_fDNpromo.implement({				
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
			if (this.stsSimpan == 1) this.doClick();
			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from sju_dnp_m where no_dn='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					}		

					if (this.c_kateg.getText() == "TERTANGGUNG") {
						var namaCust = this.e_namattg.rightLabelCaption;
						var kodeCust = this.e_namattg.getText();
					}
					else {
						var namaCust = this.e_namanon.getText();
						var kodeCust = "-";
					}
					sql.add("insert into sju_dnp_m(no_dn,kode_lokasi,nik_user,tgl_input,periode,kode_pp,tanggal,nama_aju,nama_jabat,tahun_pajak,tgl_terima,nama,npwp,alamat,jenis,jumlah,keterangan,pph,no_pot,no_flag,nik_aju,nik_jabat, kategori,kode_cust,persen, no_bayar,nik_tahu,nik_bdh,no_pb) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',getdate(),'"+this.e_periode.getText()+"','"+this.kodePPAju+"','"+this.dp_d1.getDateString()+"','"+this.e_aju.rightLabelCaption+"','"+this.e_jabat.rightLabelCaption+"','"+this.e_tahun.getText()+
							"','"+this.dp_d2.getDateString()+"','"+namaCust+"','"+this.e_npwp.getText()+"','"+this.e_alamat.getText()+"','"+this.e_jenis.getText()+"',"+nilaiToFloat(this.e_jumlah.getText())+",'"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_pph.getText())+",'"+this.e_nopot.getText()+
							"','-','"+this.e_aju.getText()+"','"+this.e_jabat.getText()+"','"+this.c_kateg.getText()+"','"+kodeCust+"',"+nilaiToFloat(this.e_persen.getText())+",'"+this.e_nobayar.getText()+"','"+this.cb_tahu.getText()+"','-','-')");

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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg3.clear(1);
					this.pc2.setActivePage(this.pc2.childPage[0]);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :															
			case "ubah" :																			
				this.preView = "1";
				var d = new Date();
				var d1 = d.strToDate(this.dp_d1.getText());
				var d2 = d.strToDate(this.dp_d2.getText());
				if (d2 > d1) {							
					system.alert(this,"Tanggal Penerimaan tidak valid.","Tanggal Penerimaan tidak boleh melebihi Tanggal DN");
					return false;
				}
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";				
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from sju_dnp_m where no_dn='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");	
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}

		if (this.e_periode.getText().substr(4,2) == "01") this.bulan = "I";
		if (this.e_periode.getText().substr(4,2) == "02") this.bulan = "II";
		if (this.e_periode.getText().substr(4,2) == "03") this.bulan = "III";
		if (this.e_periode.getText().substr(4,2) == "04") this.bulan = "IV";
		if (this.e_periode.getText().substr(4,2) == "05") this.bulan = "V";
		if (this.e_periode.getText().substr(4,2) == "06") this.bulan = "VI";
		if (this.e_periode.getText().substr(4,2) == "07") this.bulan = "VII";
		if (this.e_periode.getText().substr(4,2) == "08") this.bulan = "VIII";
		if (this.e_periode.getText().substr(4,2) == "09") this.bulan = "IX";
		if (this.e_periode.getText().substr(4,2) == "10") this.bulan = "X";
		if (this.e_periode.getText().substr(4,2) == "11") this.bulan = "XI";
		if (this.e_periode.getText().substr(4,2) == "12") this.bulan = "XII";

		if (this.stsSimpan == 1) {
			this.e_tahun.setText(this.e_periode.getText().substr(0,4));
			this.doClick();				
		}
	},
	doHitung:function(sender){
		if (sender == this.i_persen && this.e_persen.getText()!="" && this.e_jumlah.getText()!="") {
			var pph = Math.round( (nilaiToFloat(this.e_jumlah.getText()) * (nilaiToFloat(this.e_persen.getText()) / 100) ) * 100) / 100;
			this.e_pph.setText(floatToNilai(pph));
		}
		if (sender == this.i_nilai && this.e_pph.getText()!="" && this.e_jumlah.getText()!="") {
			var persen = Math.round((nilaiToFloat(this.e_pph.getText()) / nilaiToFloat(this.e_jumlah.getText())) * 10000) / 100;
			this.e_persen.setText(floatToNilai(persen));
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.stsSimpan ==1) this.doClick();	
		if (sender == this.c_kateg && this.c_kateg.getText()!="") {
			if (this.c_kateg.getText() == "TERTANGGUNG") {
				this.e_namattg.show();
				this.e_namanon.hide();
				this.e_namattg.setTag(2);
				this.e_namanon.setTag(9);
			}
			else {
				this.e_namattg.hide();
				this.e_namanon.show();
				this.e_namattg.setTag(9);
				this.e_namanon.setTag(2);
			}
		}
		if (sender == this.e_aju && this.e_aju.getText()) {
			var strSQL = "select kode_pp from karyawan where nik = '"+this.e_aju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						this.kodePPAju = line.kode_pp;
					}
				}
		}		
		if (sender == this.e_namattg && this.e_namattg.getText()) {
			var strSQL = "select npwp,alamat from sju_cust where kode_cust = '"+this.e_namattg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){										
					this.e_npwp.setText(line.npwp);
					this.e_alamat.setText(line.alamat);
				}
			}
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {
			if (this.stsSimpan == 0) {									
				this.sg3.clear(1);
			}
			this.stsSimpan = 1;
			var AddFormat = "____/DNP/"+this.bulan+"/"+this.e_periode.getText().substr(0,4)+"%";
			var data = this.dbLib.getDataProvider("select isnull(max(no_dn),0) as no_bukti from sju_dnp_m where no_dn like '"+AddFormat+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_bukti == "0") this.e_nb.setText("0001/DNP/"+this.bulan+"/"+this.e_periode.getText().substr(0,4));
					else {
						var idx = parseFloat(line.no_bukti.substr(0,4)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "000"+idx;
						if (idx.length == 2) var nu = "00"+idx;
						if (idx.length == 3) var nu = "0"+idx;
						if (idx.length == 4) var nu = idx;
						this.e_nb.setText(nu+"/DNP/"+this.bulan+"/"+this.e_periode.getText().substr(0,4));						
					}
				} 
			}
			this.e_aju.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_sju16_rptAjuProm";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_dn='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
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
								this.pc2.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							} 
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
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
				this.pc2.show();   
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
			this.sg3.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																			
		var strSQL = "select distinct a.no_dn,convert(varchar,a.tanggal,103) as tgl,a.tahun_pajak as tahun,a.keterangan,a.jumlah "+
		             "from sju_dnp_m a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_flag ='-' and a.no_pb='-'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_dn,line.tgl,line.tahun,line.keterangan,floatToNilai(line.jumlah)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);	
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select * from sju_dnp_m where no_dn = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";										
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						this.dp_d1.setText(line.tanggal);													
						this.e_aju.setText(line.nik_aju);							
						this.e_jabat.setText(line.nik_jabat);

						this.cb_tahu.setText(line.nik_tahu);
						// this.cb_bdh.setText(line.nik_bdh);	
												
						this.e_tahun.setText(line.tahun_pajak);							
						this.dp_d2.setText(line.tgl_terima);	
						this.c_kateg.setText(line.kategori);	
						if (line.kategori == "TERTANGGUNG") this.e_namattg.setText(line.kode_cust);	
						else this.e_namanon.setText(line.nama);	
						this.e_npwp.setText(line.npwp);													
						this.e_alamat.setText(line.alamat);							
						this.e_jenis.setText(line.jenis);
						this.e_jumlah.setText(floatToNilai(line.jumlah));							
						this.e_ket.setText(line.keterangan);
						this.e_persen.setText(floatToNilai(line.persen));
						this.e_pph.setText(floatToNilai(line.pph));							
						this.e_nopot.setText(line.no_pot);
						this.e_nobayar.setText(line.no_bayar);
					}
				}					
			}									
		} catch(e) {alert(e);}
	}
});