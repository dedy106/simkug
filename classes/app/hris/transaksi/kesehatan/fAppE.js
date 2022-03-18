window.app_hris_transaksi_kesehatan_fAppE = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_kesehatan_fAppE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_kesehatan_fAppE";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approve Reimburse dan Bantuan: Batal", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Verifikasi", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Verifikasi", multiSelection:false, maxLength:10, tag:1});		
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,340], childPage:["Data Pengajuan","Detail Data Reimburse"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:10,tag:9,
				colTitle:["Status","Catatan","No Reimburse","Tanggal","Tgl Ambil","Keterangan","Loker","Karyawan","Tgl Kuitansi","Nilai"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,100,200,200,220,70,70,120,150,80]],
				readOnly:true,
				colFormat:[[8],[cfNilai]],				
				defaultRow:1,dblClick:[this,"doDoubleClick"],autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
		            colTitle:["NIK","Nama","Kode Jenis","Keterangan","Saldo Plafon","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,100,150,80,150,80]],
					readOnly:true,
					colFormat:[[4,5],[cfNilai,cfNilai]],
					defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_app.setSQL("select a.nik, a.nama from gr_karyawan a "+
							"inner join gr_otorisasi b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and b.sts_oto='VERREIMB' and a.nik='"+this.app._userLog+"'",["a.nik","a.nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
			this.e_nb.setSQL("select no_ver, keterangan from gr_ver_m where modul = 'REIMBURSE' and kode_lokasi='"+this.app._lokasi+"'",["no_ver","keterangan"],false,["No Approve","Keterangan"],"and","Data Approve",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_kesehatan_fAppE.extend(window.childForm);
window.app_hris_transaksi_kesehatan_fAppE.implement({
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
					this.sg.clear(1);
					this.sg2.clear(1);
					setTipeButton(tbHapus);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_ver_m where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update a set a.progress='0' "+
					        "from gr_kes_m a inner join gr_ver_d b on a.no_kes=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_ver='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_ver_d where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
	},
	doChange:function(sender){
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider(
					   "select a.tanggal,a.keterangan,a.nik_app,b.nama as nama_app "+
					   "from gr_ver_m a inner join gr_karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi "+					   					   
					   "where a.no_ver='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.dp_d1.setText(line.tanggal);					
					this.e_ket.setText(line.keterangan);				
					this.cb_app.setText(line.nik_app,line.nama_app);
				} 
			}
			var data = this.dbLib.getDataProvider("select a.no_kes,convert(varchar,a.tanggal,103) as tanggal, convert(varchar,a.tgl_ambil,103) as tgl_ambil,a.keterangan,b.kode_loker+' - '+b.nama as loker,a.nik_buat+' - '+c.nama as karyawan,convert(varchar,a.tgl_kuitansi,103) as tgl_kuitansi,isnull(x.nilai,0) as nilai,z.status,z.catatan "+
				"from gr_kes_m a inner join gr_ver_d z on a.no_kes=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+
				"                inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
				"				 inner join gr_loker b on c.kode_loker=b.kode_loker and c.kode_lokasi=b.kode_lokasi "+
				"                inner join (select no_kes,kode_lokasi,sum(nilai) as nilai from gr_kes_d group by no_kes,kode_lokasi) x on x.no_kes=a.no_kes and a.kode_lokasi=x.kode_lokasi "+
				"where z.no_ver = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.status,line.catatan,line.no_kes,line.tanggal,line.tgl_ambil,line.keterangan,line.loker,line.karyawan,line.tgl_kuitansi,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
	},	
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(2,row) != "") {
			var data = this.dbLib.getDataProvider(
				"select  a.nik,b.nama as nama_kar,a.kode_jenis,c.nama as nama_jenis,a.pasien,a.nilai,a.saldo "+
				"from gr_kes_d a "+
				"         inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
				"         inner join gr_kes_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi "+
				"where a.no_kes='"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																
					this.sg2.appendData([line.nik,line.nama_kar,line.kode_jenis,line.nama_jenis,floatToNilai(line.saldo),floatToNilai(line.nilai)]);
				}
			} else this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
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
