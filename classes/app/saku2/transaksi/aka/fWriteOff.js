window.app_saku2_transaksi_aka_fWriteOff = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_fWriteOff.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_fWriteOff";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Write Off Piutang", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_drk = new saiCBBL(this,{bound:[20,16,200,20],caption:"DRK W/O", multiSelection:false, maxLength:10, tag:2 });
		this.cb_beban = new saiCBBL(this,{bound:[20,18,200,20],caption:"Akun Beban", multiSelection:false, maxLength:10, tag:2 });
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_piutang = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Total Piutang", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_nim = new saiCBBL(this,{bound:[20,18,200,20],caption:"Mahasiswa", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.e_sisih = new saiLabelEdit(this,{bound:[720,18,200,20],caption:"Total Penyisihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new panel(this,{bound:[20,23,900,280],caption:"Data Tagihan"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:8,tag:0,
		            colTitle:["No Invoice","Periode","Kode Produk","Nama Produk","Akun Piutang","Akun AP","Nilai Piutang","Nilai Penyisihan"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,70,70,215,80,60,150]],
					colFormat:[[6,7],[cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7],[]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});	
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.pp = "";
			
			this.cb_beban.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun Beban",true);
			this.cb_nim.setSQL("select a.nim, a.nama,b.kode_pp from aka_mahasiswa a inner join aka_jurusan b on a.kode_jur=b.kode_jur and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"'",["a.nim","a.nama","b.kode_pp"],false,["NIM","Nama","PP"],"and","Daftar Mahasiswa",true);
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='ARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_aka_fWriteOff.extend(window.childForm);
window.app_saku2_transaksi_aka_fWriteOff.implement({
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
			if (nilaiToFloat(this.e_sisih.getText()) != nilaiToFloat(this.e_piutang.getText())) this.cb_beban.setTag("2"); else this.cb_beban.setTag("9"); 
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_batal_m","no_batal",this.app._lokasi+"-WO"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into aka_batal_m(no_batal,no_dokumen,tanggal,keterangan,nilai_tagih,nilai_amor,nilai_bayar,posted,modul,kode_drk,akun_titip,nim,nik_buat,nik_app,kode_lokasi,periode,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+parseNilai(this.e_piutang.getText())+","+parseNilai(this.e_piutang.getText())+","+parseNilai(this.e_sisih.getText())+",'F','WO','"+this.cb_drk.getText()+"','"+this.cb_beban.getText()+"','"+this.cb_nim.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					var selisih = nilaiToFloat(this.e_piutang.getText()) - nilaiToFloat(this.e_sisih.getText());
					if (selisih != 0) {
						sql.add("insert into aka_batal_j(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_beban.getText()+"','"+this.e_ket.getText()+"','D',"+selisih+",'"+this.pp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','WO','BEBAN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					}					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into aka_batal_d(no_batal,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul) values "+
										"	('"+this.e_nb.getText()+"','"+this.cb_nim.getText()+"','"+this.sg.cells(0,i)+"','"+this.e_periode.getText()+"',"+parseNilai(this.sg.cells(6,i))+",'"+this.app._lokasi+"','"+this.cb_beban.getText()+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(2,i)+"','D','WO')");																		
								sql.add("insert into aka_batal_j(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.sg.cells(5,i)+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.sg.cells(7,i))+",'"+this.pp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','WO','AP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
								sql.add("insert into aka_batal_j(no_batal,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.sg.cells(4,i)+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.sg.cells(6,i))+",'"+this.pp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','WO','PIUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");										
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); 
					this.cb_beban.setTag("2");
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				if (nilaiToFloat(this.e_piutang.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai piutang tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_batal_m","no_batal",this.app._lokasi+"-WO"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
	},
	doChange: function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="")
			this.cb_drk.setSQL("select kode_drk, nama from drk where tipe ='posting' and kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.e_periode.getText().substr(0,4)+"' ",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);

		if (sender == this.cb_nim && this.cb_nim.getText()!="") {
			this.pp = this.cb_nim.dataFromList[2];
			this.e_piutang.setText("0");
			this.e_sisih.setText("0");			
			var periodeSisih = this.e_periode.getText();
			var data = this.dbLib.getDataProvider("select max(periode) as periode from aka_sisih_d where nim = '"+this.cb_nim.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				periodeSisih = line.periode
			}						 
			var strSQL = "select a.no_inv,a.periode,a.kode_produk,c.nama,a.akun_piutang,c.akun_ap,a.nilai-isnull(x.tot_batal,0)-isnull(d.tot_rekon,0) as nilai,isnull(b.tot_sisih,0) as sisih "+
						 "from aka_bill_d a "+
						 "      inner join aka_produk c on a.kode_produk=c.kode_produk and a.kode_lokasi=c.kode_lokasi "+
						 "      left join (select no_inv,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_rekon "+
						 "                 from aka_rekon_d where nim = '"+this.cb_nim.getText()+"' and periode = '"+periodeSisih+"' group by no_inv,kode_produk,kode_lokasi) d on a.no_inv=d.no_inv and a.kode_produk=d.kode_produk and a.kode_lokasi=d.kode_lokasi "+
						 "      left join (select no_inv,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_sisih "+
						 "                 from aka_sisih_d where nim = '"+this.cb_nim.getText()+"' and periode = '"+periodeSisih+"' group by no_inv,kode_produk,kode_lokasi) b on a.no_inv=b.no_inv and a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+						 
						 "      left join (select no_inv,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_batal "+
						 "                 from aka_batal_d where nim = '"+this.cb_nim.getText()+"' group by no_inv,kode_produk,kode_lokasi) x on a.no_inv=x.no_inv and a.kode_produk=x.kode_produk and a.kode_lokasi=x.kode_lokasi "+
						 "where a.nilai-isnull(x.tot_batal,0)-isnull(d.tot_rekon,0)>0 and a.nim = '"+this.cb_nim.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.no_inv,line.periode,line.kode_produk,line.nama,line.akun_piutang,line.akun_ap,floatToNilai(line.nilai),floatToNilai(line.sisih)]);
				}
			} else this.sg.clear(1);			
		}
	},
	doNilaiChange: function(){
		try{
			var totP = totS = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != "" && this.sg.cells(7,i) != ""){
					totP += nilaiToFloat(this.sg.cells(6,i));
					totS += nilaiToFloat(this.sg.cells(7,i));
				}
			}
			this.e_piutang.setText(floatToNilai(totP));
			this.e_sisih.setText(floatToNilai(totS));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	/*
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
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
	*/	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							this.nama_report="server_report_saku2_aka_....";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_batal='"+this.e_nb.getText()+"' ";
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
							//this.pc1.hide();							
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
				//this.pc1.show();   
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
			this.sg.clear(1); 
			this.cb_beban.setTag("2");
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});