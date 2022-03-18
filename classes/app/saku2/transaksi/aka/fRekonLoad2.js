window.app_saku2_transaksi_aka_fRekonLoad2 = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_fRekonLoad2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_fRekonLoad2";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Rekonsiliasi Pelunasan Tagihan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_titip = new saiCBBL(this,{bound:[20,18,200,20],caption:"Akun Pelunasan", multiSelection:false, maxLength:10, tag:2 });
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_piutang = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_jur = new saiCBBL(this,{bound:[20,18,200,20],caption:"Prodi", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.e_nilai = new saiLabelEdit(this,{bound:[720,18,200,20],caption:"Total Pelunasan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bUpload = new portalui_uploader(this,{bound:[600,18,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,287], childPage:["Data Tagihan","Data Pelunasan"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:10,tag:0,
		            colTitle:["NIM","Nama","No Invoice","Periode","Kode Produk","Nama Produk","Akun Piutang","Saldo Tagihan","Nilai Pelunasan","ID Bank"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,100,100,70,100,80,80,150,150,80]],
					colFormat:[[7,8],[cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPager"]});	
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:12,
					colTitle:["NIM","Nama","No Invoice","BPP","UP3","SDP2","SKS","S2BPP","S2UP3","S2SDP2","S2SKS","ID Bank"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[80,100,100,100,100,100,100,100,100,180,200,80]],
					colFormat:[[3,4,5,6,7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					readOnly:true, defaultRow:1
					});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		this.bRefresh = new portalui_imageButton(this.sgn1,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);

		
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
			
			this.cb_titip.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun Pelunasan",true);
			this.cb_jur.setSQL("select kode_jur, nama from aka_jurusan where kode_lokasi='"+this.app._lokasi+"'",["kode_jur","nama"],false,["Kode","Nama"],"and","Daftar Prodi",true);
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi where kode_spro='KBTTP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_titip.setText(line.flag,line.nama);
			} else this.cb_titip.setText("","");									
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
window.app_saku2_transaksi_aka_fRekonLoad2.extend(window.childForm);
window.app_saku2_transaksi_aka_fRekonLoad2.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn1.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));				
				this.sgn1.rearrange();
				this.sgn1.activePage = 0;								
			}else throw(data);		
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].lunas=0;
			}				
			var line; var line2;
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];
				for (var j=0;j < this.dataJU.rs.rows.length;j++){
					if (line.no_invoice == this.dataJU.rs.rows[j].no_inv) {
						if (this.dataJU.rs.rows[j].kode_produk.toUpperCase() == "BPP") this.dataJU.rs.rows[j].lunas += parseFloat(line.bpp);
						if (this.dataJU.rs.rows[j].kode_produk.toUpperCase() == "UP3") this.dataJU.rs.rows[j].lunas += parseFloat(line.up3);
						if (this.dataJU.rs.rows[j].kode_produk.toUpperCase() == "SDP2") this.dataJU.rs.rows[j].lunas += parseFloat(line.sdp2);
						if (this.dataJU.rs.rows[j].kode_produk.toUpperCase() == "SKS") this.dataJU.rs.rows[j].lunas += parseFloat(line.sks);
						if (this.dataJU.rs.rows[j].kode_produk.toUpperCase() == "S2BPP") this.dataJU.rs.rows[j].lunas += parseFloat(line.s2bpp);
						if (this.dataJU.rs.rows[j].kode_produk.toUpperCase() == "S2UP3") this.dataJU.rs.rows[j].lunas += parseFloat(line.s2up3);
						if (this.dataJU.rs.rows[j].kode_produk.toUpperCase() == "S2SDP2") this.dataJU.rs.rows[j].lunas += parseFloat(line.s2sdp2);
						if (this.dataJU.rs.rows[j].kode_produk.toUpperCase() == "S2SKS") this.dataJU.rs.rows[j].lunas += parseFloat(line.s2sks);
						this.dataJU.rs.rows[j].id_bank = line.id_bank;
					}
				}
			}
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				tot = tot + parseFloat(line.lunas);
			}
			this.e_nilai.setText(floatToNilai(tot));
			
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.doTampilData(1);
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];
			this.sg1.appendData([line.nim,line.nama,line.no_invoice,floatToNilai(line.bpp),floatToNilai(line.up3),floatToNilai(line.sdp2),floatToNilai(line.sks),floatToNilai(line.s2bpp),floatToNilai(line.s2up3),floatToNilai(line.s2sdp2),floatToNilai(line.s2sks),line.id_bank]);
		}
		this.sg1.setNoUrut(start);
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_rekon_m","no_rekon",this.app._lokasi+"-REK"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into aka_rekon_m(no_rekon,no_dokumen,tanggal,keterangan,nilai,posted,modul,akun_titip,nim,nik_buat,nik_app,kode_lokasi,periode,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+parseNilai(this.e_nilai.getText())+",'F','LOAD','"+this.cb_titip.getText()+"','"+this.cb_jur.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
					sql.add("insert into aka_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
							"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOAD','TTP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
					this.doHitungAR();
					var line = undefined;
					for (var i in this.gridAR.objList){
						line = this.gridAR.get(i);
						sql.add("insert into aka_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
								"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+line.get("kode_akun")+"','"+this.e_ket.getText()+"','C',"+parseFloat(line.get("nilai"))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','LOAD','PIUT','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
					}						
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (parseFloat(line.lunas) != 0){
							sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank) values "+
									"	('"+this.e_nb.getText()+"','"+line.nim+"','"+line.no_inv+"','"+this.e_periode.getText()+"',"+line.lunas+",'"+this.app._lokasi+"','"+this.cb_titip.getText()+"','"+line.akun_piutang+"','"+line.kode_produk+"','D','LOAD','"+line.id_bank+"')");
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
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					if (parseFloat(line.lunas) > parseFloat(line.saldo)){
						system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh melebihi saldo. Inv : "+line.no_inv + " - " +line.kode_produk);
						return false;						
					}
				}
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai pelunasan tidak boleh nol atau kurang.");
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_rekon_m","no_rekon",this.app._lokasi+"-REK"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},
	doChange: function(sender){
		if (sender == this.cb_jur && this.cb_jur.getText()!="") {
			this.e_piutang.setText("0");
			this.e_nilai.setText("0");			
			var strSQL = "select aa.nim,aa.nama as mhs,a.no_inv,a.periode,a.kode_produk,c.nama,a.akun_piutang,(a.nilai-isnull(x.tot_batal,0)-isnull(b.tot_lunas,0)) as saldo,0 as lunas, '-' as id_bank "+
						 "from aka_bill_d a "+
						 "      inner join aka_mahasiswa aa on aa.nim=a.nim and aa.kode_lokasi=aa.kode_lokasi "+
						 "      inner join aka_produk c on a.kode_produk=c.kode_produk and a.kode_lokasi=c.kode_lokasi "+
						 "      left join (select no_inv,nim,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_lunas "+
						 "                 from aka_rekon_d group by nim,no_inv,kode_produk,kode_lokasi) b on a.nim=b.nim and a.no_inv=b.no_inv and a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+
						 "      left join (select no_inv,nim,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_batal "+
						 "                 from aka_batal_d group by nim,no_inv,kode_produk,kode_lokasi) x on a.nim=x.nim and a.no_inv=x.no_inv and a.kode_produk=x.kode_produk and a.kode_lokasi=x.kode_lokasi "+						 
						 "where (a.nilai-isnull(x.tot_batal,0)-isnull(b.tot_lunas,0)) > 0 and aa.kode_jur = '"+this.cb_jur.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by aa.nim,a.kode_produk";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				var line;
				var tot = 0;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					tot = tot + parseFloat(line.saldo);
				}		
				this.e_piutang.setText(floatToNilai(tot));
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);	
		}
	},
	doTampilData: function(page) {
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.nim,line.mhs,line.no_inv,line.periode,line.kode_produk,line.nama,line.akun_piutang,floatToNilai(line.saldo),floatToNilai(line.lunas),line.id_bank]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doHitungAR: function() {
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var ix,dtJrnl = 0;
		for (var i=0;i < this.dataJU.rs.rows.length;i++){
			line = this.dataJU.rs.rows[i];
			if (parseFloat(line.lunas) != 0){
				kdAkun = line.akun_piutang;
				nemu = false;
				ix = 0;
				for (var j in dtJurnal.objList){		
				  if ((kdAkun == dtJurnal.get(j).get("kode_akun"))){
					nemu = true;
					row = dtJurnal.get(j);
					ix = j;
					break;
				  }
				}
				if (!nemu){
					row = new portalui_arrayMap();
					row.set("kode_akun",kdAkun);
					row.set("nilai",parseFloat(line.lunas));
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}else dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(line.lunas));
			}
		}
		this.gridAR = dtJurnal;
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
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_rekon='"+this.e_nb.getText()+"' ";
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
			this.sg.clear(1); 
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});