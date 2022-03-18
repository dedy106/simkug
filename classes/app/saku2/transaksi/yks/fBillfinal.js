window.app_saku2_transaksi_yks_fBillfinal = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_fBillfinal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_yks_fBillfinal";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Jurnal TAK Penyelesaian Piutang: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});				
		this.cb_tujuan = new saiCBBL(this,{bound:[20,16,200,20],caption:"Lokasi Tujuan", multiSelection:false, maxLength:10, tag:2});
		this.cb_tak = new saiCBBL(this,{bound:[20,15,200,20],caption:"Akun TAK", multiSelection:false, maxLength:10, tag:2});
		this.cb_piutang = new saiCBBL(this,{bound:[20,16,200,20],caption:"Akun Penyelesaian", multiSelection:false, maxLength:10, tag:2});
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_nilai = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.bTampil = new button(this,{bound:[615,17,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,300], childPage:["Data Piutang","Detail Billing"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,
				colTitle:["Status","No Piutang","Loker","Tanggal","Keterangan","Jenis","Nilai"],
				colWidth:[[6,5,4,3,2,1,0],[100,60,300,80,70,150,80]],
				columnReadOnly:[true,[0,1,2,3,4,5,6],[]],
				colFormat:[[6],[cfNilai]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],checkItem:true,
				nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],dblClick:[this,"doDoubleClick"],buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.childPage[1].width-5,this.pc1.childPage[1].height-35],colCount:17,tag:9,
				colTitle:["Kode Mitra","No Ref","NIK","Nama","Loker Valid","Loker BAST","Area Host","Band","NIKKES","Nama Pasien","Tgl Masuk","Tgl Keluar","ICD-X","Kode Biaya","Nilai","Nilai Kunj","Nilai CS"],
				colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,100,70,70,70,70,100,70,70,70,100,100,100,70,100,70]],
				colFormat:[[14,15,16],[cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1
		});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.childPage[1].height-25,this.pc1.childPage[1].width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});				
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);		
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
						
			this.cb_tujuan.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi <> '00' and kode_lokasi<>'"+this.app._lokasi+"'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi Tujuan",true);
			this.cb_tak.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                   "where b.kode_flag = '016' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Daftar Akun TAK",true);

			this.cb_piutang.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun",true);			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='JUAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");		
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
						
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_yks_fBillfinal.extend(window.childForm);
window.app_saku2_transaksi_yks_fBillfinal.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"takkirim_m","no_kirim",this.app._lokasi+"-SPU"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into takkirim_m(no_kirim,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,ref1,tgl_input,nik_user,kode_loktuj,progress) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','-','TAK','PIU','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','F','-','-','-',getdate(),'"+this.app._userLog+"','"+this.cb_tujuan.getText()+"','0')");
					sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+this.cb_tak.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SLSPIU','TAK','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					sql.add("insert into takkirim_j(no_kirim,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+this.cb_piutang.getText()+"','"+this.e_ket.getText()+"','C',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SLSPIU','SLSPIU','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
	
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i)=="APP"){																
								sql.add("update a set a.no_selesai='"+this.e_nb.getText()+"' "+
										"from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+
										"where b.jenis<>'PENSIUN' and a.no_piutang = '"+this.sg.cells(1,i)+"' and a.loker_bast='"+this.sg.cells(2,i)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_selesai='-' and a.flag_aktif ='1'");								
								sql.add("update a set a.no_selesai='"+this.e_nb.getText()+"' "+
										"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
										"where b.jenis<>'PENSIUN' and a.no_piutang = '"+this.sg.cells(1,i)+"' and a.loker_bast='"+this.sg.cells(2,i)+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.no_selesai='-' and a.flag_aktif ='1'");																
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
					this.sg1.clear(1);
					setTipeButton(tbSimpan);					
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang.");
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
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"takkirim_m","no_kirim",this.app._lokasi+"-SPU"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_dok.setFocus();
	},
	doLoad:function(sender){	
		if (this.e_periode.getText() != "") {
			this.sg1.clear(1); 
			var data = this.dbLib.getDataProvider(
			           "select a.no_valid,a.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,sum(a.nilai) as nilai "+
					   "from ( "+
					   "select a.no_valid,b.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,sum(b.nilai) as nilai "+
					   "from yk_valid_m a inner join yk_bill_d b on a.no_valid=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
					   "                  inner join cust c on b.loker_bast=c.kode_cust "+
			           "where b.flag_aktif ='1' and b.no_selesai = '-' and c.jenis <> 'PENSIUN' and a.periode <='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul = 'BAST' "+
					   "group by a.no_valid,b.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul "+
					   "union "+
					   "select a.no_valid,b.loker_bast,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.modul,sum(b.umum+b.gigi+b.kbia+b.matkes-b.cs) as nilai "+
					   "from yk_valid_m a inner join yk_billkunj_d b on a.no_valid=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
					   "                  inner join cust c on b.loker_bast=c.kode_cust "+
			           "where b.flag_aktif ='1' and b.no_selesai = '-' and c.jenis <> 'PENSIUN' and a.periode <='"+this.e_periode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.modul = 'BAST' "+
					   "group by a.no_valid,b.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul "+
					   ") a where a.nilai <> 0 group by a.no_valid,a.loker_bast,convert(varchar,a.tanggal,103),a.keterangan,a.modul order by a.loker_bast",true);
						  
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["APP",line.no_valid,line.loker_bast,line.tanggal,line.keterangan,line.modul,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else {
			system.alert(this,"Data tidak valid.","Periode harus diisi.");
		}
	},
	doDoubleClick: function(sender, col , row) {
		//hanya yg piutang pegawai loker setempat
		if (this.sg.cells(1,row) != "") {
			var strSQL = "select a.kode_vendor,a.no_ref,a.nik,a.nama,a.loker_valid,a.loker_bast,b.kode_lokasi,a.band,a.nikkes,a.pasien,convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_keluar,103) as tgl_keluar,a.icdx,a.kode_produk,a.nilai,a.nilai_kunj,a.nilai_cs "+
			             "from yk_bill_d a inner join cust b on a.loker_bast=b.kode_cust "+
						 "where b.flag_aktif ='1' and a.kode_lokasi=b.kode_lokasi and b.jenis <> 'PENSIUN' and a.no_loker_bast = '"+this.sg.cells(2,row)+"' and a.no_piutang = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
		} else system.alert(this,"Data tidak valid.","HR Peserta harus diisi.");
	},	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg1.appendData([line.kode_vendor,line.no_ref,line.nik,line.nama,line.loker_valid,line.loker_bast,line.kode_lokasi,line.band,line.nikkes,line.pasien,line.tgl_masuk,line.tgl_keluar,line.icdx,line.kode_produk,floatToNilai(line.nilai),floatToNilai(line.nilai_kunj),floatToNilai(line.nilai_cs)]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},   
	doChangeCell: function(sender, col, row){
		if (col == 0) {
			this.sg.validasi();
		}
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(6,i) != "" && this.sg.cells(0,i) == "APP"){
					if (this.sg.cells(5,i) == "BAST") tot += nilaiToFloat(this.sg.cells(6,i));
					if (this.sg.cells(5,i) == "BAREV") tot -= nilaiToFloat(this.sg.cells(6,i));
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});