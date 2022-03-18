window.app_saku2_transaksi_sppd_fSpjAppB = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_sppd_fSpjAppB.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_sppd_fSpjAppB";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Verifikasi Pengajuan SPPD: Batal", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_dasar = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Dasar perj. Dinas", maxLength:100});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Maksud/Tujuan", maxLength:150});
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});						
		
		this.pc1 = new pageControl(this,{bound:[20,12,980,337], childPage:["Data SPPD","Data Anggaran","Detail Transport","Detail Uang Harian"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:11,tag:0,
		            colTitle:["Status","No Bukti","No Dokumen","Tanggal","Keterangan","Kode Akun","Kode PP","Kode DRK","Pengaju","Nilai","Periode"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[60,100,150,80,80,80,200,60,100,100,80]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10],[]],
					colFormat:[[9],[cfNilai]], 					
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.sg4 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,150,80,150,80,150,80]],
					readOnly:true,colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4});
		this.i_budget = new portalui_imageButton(this.sgn4,{bound:[955,2,20,20],hint:"Lihat Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
						
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:9,tag:9,		            
					colTitle:["Kode Jns","Jenis Angkutan","Kode Rute","Nama","Tempat Asal","Tempat Tujuan","Tarif","Jumlah","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,80,155,155,160,70,80,60]],
					readOnly:true,					
					colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],
					defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.sg3 = new saiGrid(this.pc1.childPage[3],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,
		            colTitle:["Kd Jenis","Jenis SPPD","Tanggal Berangkat","Tanggal Tiba","Lama Hari","Tarif","Persen","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,80,100,120,120,120,200,80]],
					readOnly:true, colFormat:[[2,3,4,5,6,7],[cfDate,cfDate,cfNilai,cfNilai,cfNilai,cfNilai]], defaultRow:1,
					autoAppend:false});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3});
			
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		
		setTipeButton(tbHapus);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;
		this.dataPP = this.app._pp;					
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			this.flagGarFree = "0";		
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro = 'GARFREE' and kode_lokasi = '"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];																	
				this.flagGarFree = line.flag;							
			}			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
			
			var data = this.dbLib.getDataProvider("select kode_bidang from pp where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.kodeBidang = line.kode_bidang;
			} else this.kodeBidang = "-";
			this.cb_buat.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.kode_bidang='"+this.kodeBidang+"' and b.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.kode_bidang='"+this.kodeBidang+"' and b.kode_lokasi='"+this.app._lokasi+"'",["a.nik","a.nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_sppd_fSpjAppB.extend(window.childForm);
window.app_saku2_transaksi_sppd_fSpjAppB.implement({
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
					this.dataJU.rs.rows = [];
					this.sg.clear(1); this.sg2.clear(1); this.sg4.clear(1); this.sg3.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbHapus);
				break;			
			case "hapus" :											
					//periode tidak diproteksi,,untuk mengembalikan anggaran ke TW saat ngambil
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();											
					sql.add("delete from yk_ver_m where no_ver = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_ver_d where no_ver = '"+this.e_nb.getText()+"' and modul='SPPD' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti = '"+this.e_nb.getText()+"' and modul='VSPPD' and kode_lokasi='"+this.app._lokasi+"'");					
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						sql.add("update yk_spj_m set no_ver='-',progress='0' where no_spj='"+line.no_spj+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti = '"+line.no_spj+"' and dc='C' and modul='VSPPD' and kode_lokasi='"+this.app._lokasi+"'");
					}
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
	},	
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {									
			this.e_nb.setSQL("select distinct a.no_ver, a.keterangan from yk_ver_m a left join (select no_ver,no_kas,kode_lokasi from yk_spj_m where progress='2') b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi "+
							 "where a.modul='SPPD' and b.no_kas is null and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_ver","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
		}				
		if (sender == this.e_nb && this.e_nb.getText()!="") {									
			var data = this.dbLib.getDataProvider("select a.no_dokumen,a.tanggal,a.keterangan,a.nik_buat,b.nama as nama_buat,a.nik_app,c.nama as nama_app,a.dasar  "+
						"from yk_ver_m a inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
						"                inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi "+
						"where a.no_ver = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear(); this.sg2.clear(); this.sg3.clear(); this.sg4.clear();
				line = data.rs.rows[0];
				this.dp_d1.setText(line.tanggal);													
				this.e_ket.setText(line.keterangan);
				this.e_dok.setText(line.no_dokumen);
				this.e_dasar.setText(line.dasar);
				this.cb_buat.setText(line.nik_buat,line.nama_buat);
				this.cb_app.setText(line.nik_app,line.nama_app);				
				this.doLoad();
			} else {
				this.sg.clear(1); 
				this.sg2.clear(1);
				this.sg3.clear(1);
				this.sg4.clear(1);
			}
		}		
	},
	doLoad:function(sender){
		var strSQL = "select d.status,a.no_spj,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.kode_pp,a.kode_drk,a.akun_uhar,a.nik_buat+' - '+c.nama as pengaju,a.transport+a.harian as nilai,a.periode "+
					 "from yk_spj_m a inner join karyawan c on a.nik_buat=c.nik "+
					 "                inner join yk_ver_d d on a.no_spj=d.no_bukti and a.kode_lokasi=d.kode_lokasi and modul='SPPD' "+
					 "where a.no_ver ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);	
		
		var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.saldo,a.nilai,a.saldo-a.nilai as sakhir "+
					"from angg_r a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"              inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
					"              left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
					"where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='VSPPD' order by a.kode_akun",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg4.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg4.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,floatToNilai(line.saldo),floatToNilai(line.nilai),floatToNilai(line.sakhir)]);
			}
		} else this.sg4.clear(1);
	},
	doTampilData: function(page) {
		this.sg.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.status.toUpperCase(),line.no_spj,line.no_dokumen,line.tanggal,line.keterangan,line.akun_uhar,line.kode_pp,line.kode_drk,line.pengaju,floatToNilai(line.nilai),line.periode]);
		}
		this.sg.setNoUrut(start);
	},
	doChangeCells: function(sender, col , row) {
		if (col == 0 ) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);			
		}
		if (col == 1 ) {		
			this.dataJU.rs.rows[((this.page-1)*20) + row].catatan = this.sg.cells(1,row);
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(2,row) != "") {			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			var strSQL = "select a.kode_trans,a.asal+'-'+a.tujuan as nama,a.nilai,a.asal,a.tujuan,a.kode_jenis,a.tarif,a.jumlah,b.nama as nama_jenis "+
			             "from yk_spj_dt a inner join yk_spj_jenis b on a.kode_jenis=b.kode_jenis  "+
					     "where a.no_spj='"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){				
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_jenis,line.nama_jenis,line.kode_trans,line.nama,line.asal,line.tujuan,floatToNilai(line.tarif),floatToNilai(line.jumlah),floatToNilai(line.nilai)]);
				}
			} else this.sg2.clear(1);
						
			var data = this.dbLib.getDataProvider(
					   "select a.sts_spj,b.nama as nama_spj,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.lama,a.tarif,a.persen,a.nilai "+
			           "from yk_spj_dh a inner join yk_status_spj b on a.sts_spj=b.sts_spj "+
					   "where a.no_spj='"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg3.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg3.appendData([line.sts_spj,line.nama_spj,line.tgl_mulai,line.tgl_selesai,floatToNilai(line.lama),floatToNilai(line.tarif),floatToNilai(line.persen),floatToNilai(line.nilai)]);
				}
			} else this.sg3.clear(1);										
			this.pc1.setActivePage(this.pc1.childPage[2]);
		}
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
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
});
