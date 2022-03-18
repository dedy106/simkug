window.app_saku3_transaksi_siaga_hris_kesehatan_fVerKlaim = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_kesehatan_fVerKlaim.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_kesehatan_fVerKlaim";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval Klaim Asuransi: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[30,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[30,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[130,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,440], childPage:["Data Verifikasi Klaim","Daftar Verifikasi Klaim"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
		            colTitle:["No. Verifikasi","Keterangan","NIK Verifikasi"],
					colWidth:[[2,1,0],[100,350,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick2"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});		

		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[10,12,200,20],caption:"No Verifikasi",maxLength:30,readOnly:true,change:[this,"doChange"]});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[215,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[10,14,450,20],caption:"Keterangan", maxLength:150});		
		this.cb_app = new saiCBBL(this.pc1.childPage[0],{bound:[10,17,220,20],caption:"NIK Verifikator", multiSelection:false, maxLength:10, tag:1,readOnly:true});
		this.bTampil = new button(this.pc1.childPage[0],{bound:[878,17,80,18],caption:"Tampil Data",click:[this,"doTampilClick"]});			
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[5,20,990,337], childPage:["Data Pengajuan","Detail Data Klaim"]});		
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[0,5,this.pc2.width-5,this.pc2.height-35],colCount:11,tag:9,
				colTitle:["Status","Catatan","No Klaim","Tanggal","Tgl Ambil Dok","Keterangan","Asuransi","Loker","Karyawan","Tgl Kuitansi","Nilai"],
				colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[100,100,200,200,200,220,100,100,120,150,80]],
				columnReadOnly:[true,[0,2,3,5,6,7,8,9,10],[1,4]],
				colFormat:[[10],[cfNilai]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
				buttonStyle:[[0,4],[bsAuto,bsDate]],defaultRow:1,dblClick:[this,"doDoubleClick"],autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg});

		this.sg2 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:6,tag:9,
		            colTitle:["NIK","No Urut","Nama Pasien","Status","Jenis Perawatan","Nilai"],
					colWidth:[[5,4,3,2,1,0],[90,100,150,210,40,70]],
					colFormat:[[5],[cfNilai]],
					readOnly:true,
					defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		setTipeButton(tbSimpan);	
		
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_app.setSQL("select a.nik, a.nama from gr_karyawan a "+
							"inner join gr_otorisasi b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and b.sts_oto='VERKLAIM' ",["a.nik","a.nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
			this.cb_app.setText(this.app._userLog);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_kesehatan_fVerKlaim.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_kesehatan_fVerKlaim.implement({
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
					if (this.stsSimpan == 1) this.doClick(this.i_gen);										
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_ver_m(no_ver,kode_lokasi,periode,tanggal,modul,nik_buat,nik_app,keterangan,tgl_input,nik_user,no_del) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','KLAIM','-','"+this.cb_app.getText()+"','"+this.e_ket.getText()+"',getdate(),'"+this.app._userLog+"','-')");
	
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (this.sg.cells(0,i).toUpperCase() != "INPROG") {
									if (this.sg.cells(0,i).toUpperCase() == "APP") var vProgress = "1"; else var vProgress = "X";
									sql.add("insert into gr_ver_d(no_ver,kode_lokasi,modul,no_bukti,status,catatan,no_del) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','KLAIM','"+this.sg.cells(2,i)+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','-')");									
									sql.add("update gr_klaim_m set tgl_terima='"+this.dp_d1.getDateString()+"',tgl_ambil='"+this.sg.getCellDateValue(4,i)+"',progress='"+vProgress+"' where no_klaim='"+this.sg.cells(2,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
								}
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_ver_m where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update a set a.progress='0',tgl_terima=null,tgl_ambil=null "+
							"from gr_klaim_m a inner join gr_ver_d b on a.no_klaim=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_ver='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_ver_d where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					if (this.stsSimpan == 1) this.doClick(this.i_gen);
				break;
			case "simpan" :	
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						if (this.sg.cells(0,i).toUpperCase() != "INPROG" && this.sg.cells(4,i) == "-") {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Tgl Ambil tidak valid. Baris "+k+")");
							return false;					
						}
					}
				}
				this.simpan();
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
		this.e_periode.setText(y+""+m);
		if (this.stsSimpan == 1) this.doClick(this.i_gen);		
	},
	doTampilClick:function(sender){		
		if (this.e_periode.getText() != "") {
			var data = this.dbLib.getDataProvider("select a.no_klaim,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.kode_asur+' - '+d.nama as nama_asur,b.kode_klpjab+' - '+b.nama as loker,a.nik_buat+' - '+c.nama as karyawan,convert(varchar,a.tgl_kuitansi,103) as tgl_kuitansi,isnull(x.nilai,0) as nilai  "+
				"from gr_klaim_m a "+
				"                inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
				//"				 inner join gr_so b on c.kode_so=b.kode_so and c.kode_lokasi=b.kode_lokasi "+
				
				"                inner join gr_jab cc on c.kode_jab=cc.kode_jab and cc.kode_lokasi=c.kode_lokasi "+
				"				 inner join gr_klpjab b on cc.kode_klpjab=b.kode_klpjab and cc.kode_lokasi=b.kode_lokasi "+

				"				 inner join gr_asur d on d.kode_asur=a.kode_asur and a.kode_lokasi=d.kode_lokasi "+
				"                inner join ( "+
				"					select no_klaim,kode_lokasi,sum(nilai) as nilai "+
				"					from gr_klaim_d group by no_klaim,kode_lokasi "+
				"					) x on x.no_klaim=a.no_klaim and a.kode_lokasi=x.kode_lokasi "+
				"where a.progress = '0' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["INPROG","-",line.no_klaim,line.tanggal,'-',line.keterangan,line.nama_asur,line.loker,line.karyawan,line.tgl_kuitansi,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[0]);
		}
		else {
			system.alert(this,"Data tidak valid.","Periode harus diisi.");
		}
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			setTipeButton(tbSimpan);
		}
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_ver_m","no_ver",this.app._lokasi+"-VKL"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();
	},
	doChange:function(sender){
		if (sender == this.e_nb && this.e_nb.getText()!="" && this.stsSimpan==0) {
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
			var data = this.dbLib.getDataProvider("select a.no_klaim,convert(varchar,a.tanggal,103) as tanggal,convert(varchar,a.tgl_ambil,103) as tgl_ambil,a.keterangan,a.kode_asur+' - '+d.nama as nama_asur,"+
				"b.kode_klpjab+' - '+b.nama as loker,a.nik_buat+' - '+c.nama as karyawan,convert(varchar,a.tgl_kuitansi,103) as tgl_kuitansi,isnull(x.nilai,0) as nilai,z.status,z.catatan  "+
				"from gr_klaim_m a inner join gr_ver_d z on a.no_klaim=z.no_bukti and a.kode_lokasi=z.kode_lokasi "+
				"                inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
				//"				 inner join gr_so b on c.kode_so=b.kode_so and c.kode_lokasi=b.kode_lokasi "+
				"                inner join gr_jab cc on c.kode_jab=cc.kode_jab and cc.kode_lokasi=c.kode_lokasi "+
				"				 inner join gr_klpjab b on cc.kode_klpjab=b.kode_klpjab and cc.kode_lokasi=b.kode_lokasi "+
				"				 inner join gr_asur d on d.kode_asur=a.kode_asur and a.kode_lokasi=d.kode_lokasi "+
				"                inner join (select no_klaim,kode_lokasi,sum(nilai) as nilai from gr_klaim_d group by no_klaim,kode_lokasi) x on x.no_klaim=a.no_klaim and a.kode_lokasi=x.kode_lokasi "+
				"where z.no_ver = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"' and a.progress='1' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.status,line.catatan,line.no_klaim,line.tanggal,line.tgl_ambil,line.keterangan,line.nama_asur,line.loker,line.karyawan,line.tgl_kuitansi,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}		
	},	
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(2,row) != "") {
			var data = this.dbLib.getDataProvider(
				"select a.nik,a.no_urut,b.nama,c.nama as sts_kel,a.keterangan,a.nilai "+
				"from gr_klaim_d a "+
				"inner join gr_keluarga b on a.nik=b.nik and a.no_urut=b.no_urut and a.kode_lokasi=b.kode_lokasi "+
				"inner join gr_status_kel c on c.sts_kel=b.sts_kel and c.kode_lokasi=b.kode_lokasi where a.no_klaim='"+this.sg.cells(2,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																
					this.sg2.appendData([line.nik,line.no_urut,line.nama,line.sts_kel,line.keterangan,floatToNilai(line.nilai)]);
				}
			} else this.sg2.clear(1);
			this.pc2.setActivePage(this.pc2.childPage[1]);
		}
	},
	doDoubleClick2: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));										
			}
		} catch(e) {alert(e);}
	},

	doLoad:function(sender){						
		var strSQL = "select a.no_ver,a.keterangan,a.nik_app "+
					 "from gr_ver_m a "+
					 "where a.periode='"+this.e_periode.getText()+"' and a.modul='KLAIM' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_ver desc";		
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
			this.sg1.appendData([line.no_ver,line.keterangan,line.nik_app]); 
		}
		this.sg1.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
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
