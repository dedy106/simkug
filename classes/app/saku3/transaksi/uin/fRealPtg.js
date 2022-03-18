window.app_saku3_transaksi_uin_fRealPtg = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fRealPtg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fRealPtg";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pertanggungan Persekot", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.c_tahun = new saiLabelEdit(this,{bound:[20,12,200,20],caption:"Tahun",readOnly:true,tag:2, change:[this,"doChange"]});
		this.cb_pp = new saiCBBL(this,{bound:[20,16,220,20],caption:"Fak/Unit", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Pengajuan","Daftar Pengajuan"]});				
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
					 colTitle:["No Agenda","Tanggal","Keterangan","Total","Pilih"],
					 colWidth:[[4,3,2,1,0],[70,100,300,100,100]],readOnly:true,
					 colFormat:[[3,4],[cfNilai,cfButton]],	
					 click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],													 
					 dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});			
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Pengajuan",click:[this,"doLoad3"]});				

		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,11,200,20],caption:"Total Pengajuan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		
		this.e_nb = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"No Agenda", multiSelection:false, maxLength:20, change:[this,"doChange"]});
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,12,200,20],caption:"Total PPN", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.c_jenis = new saiCB(this.pc1.childPage[0],{bound:[20,22,200,20],caption:"Jenis",items:["BLU","RM"], readOnly:true,tag:2});
		this.e_pph = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,22,200,20],caption:"Total PPh", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:200});				
		this.e_neto = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,17,200,20],caption:"Net Pengajuan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.e_nilaipj = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,18,200,20],caption:"Nilai Panjar", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					
		this.e_sisa = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,18,200,20],caption:"Sisa Pencairan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});					

		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,12,995,282], childPage:["Rekap RAB","Controlling","Otorisasi","Verifikasi"]});												
		this.sg1 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:19,tag:0,
					colTitle:["KdTrm","Nama Penerima","Deskripsi","IDItem","Satuan","Harga","Vol","Jumlah","PPN","PPh","Total","Output","DOutput","Komponen","Dkomponen","KdAkun","IDitem","ID","KdGiat"],
					colWidth:[[18,17,16,15,14,13,12, 11,10,9,8,7,6,5,4,3,2,1,0],[80,50,120,80,80,80,80,80,  80,80,80,80,60,80,60,60,250,150,60]],					
					readOnly:true,		
					colHide:[[0,3,4,11,12,13,14,15,16,17,18],[true,true,true,true,true,true,true,true,true,true,true]],		
					colFormat:[[5,6,7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],				
					nilaiChange:[this,"doNilaiChange1"],					
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg1});		
	
		this.sg2 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:8,tag:9, 
					colTitle:["KdGiat","KdOut","KdSOut","KdKmpnen","KdSKmpnen","KdAkun","Saldo Budget","Ni Pengajuan"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,100,100,100,100,100]],
					colFormat:[[6,7],[cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg2});		
		
		this.cb_buat = new saiCBBL(this.pc2.childPage[2],{bound:[20,10,220,20],caption:"Dibuat Oleh", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_app = new saiCBBL(this.pc2.childPage[2],{bound:[20,13,220,20],caption:"NIK PPK", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_bdh = new saiCBBL(this.pc2.childPage[2],{bound:[20,14,220,20],caption:"NIK Bendahara", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		
		this.e_nover = new saiLabelEdit(this.pc2.childPage[3],{bound:[20,17,200,20],caption:"No Verifikasi", tag:9, readOnly:true});				
		this.e_catatan = new saiLabelEdit(this.pc2.childPage[3],{bound:[20,18,450,20],caption:"Catatan", tag:9, readOnly:true});				
		this.sg4 = new saiGrid(this.pc2.childPage[3],{bound:[1,5,this.pc2.width-5,196],colCount:4,tag:9, 
					colTitle:["Status","Catatan","Kd Dokumen","Deskripsi"],
					colWidth:[[3,2,1,0],[350,80,250,80]],										
					readOnly:true,					
					autoAppend:false,defaultRow:1});
		this.sgn4 = new portalui_sgNavigator(this.pc2.childPage[3],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3});		

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc2.childPage[2].rearrangeChild(10, 23);	
		this.pc2.childPage[3].rearrangeChild(10, 23);		
		
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

			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Fakultas/Unit",true);			
			this.cb_pp.setText(this.app._kodePP);
			this.cb_buat.setSQL("select a.nik, a.nama from karyawan a inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.cb_pp.getText()+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);				
			this.cb_buat.setText(this.app._userLog);
			this.cb_bdh.setSQL("select a.nik, a.nama from karyawan a where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fRealPtg.extend(window.childForm);
window.app_saku3_transaksi_uin_fRealPtg.implement({			
	isiCBaju: function() {
		this.e_nb.setSQL("select a.no_aju,a.keterangan from uin_aju_m a "+
						 "inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
						 "inner join uin_nota_m c on a.no_nota=c.no_nota and a.kode_lokasi=c.kode_lokasi and c.no_kas <> '-' "+
						 "where a.periode <='"+this.periode+"' and a.nilai-a.ppn-a.pph <> a.nilai_pj and a.kode_lokasi='"+this.app._lokasi+"'",["no_aju","keterangan"],false,["No Agenda","Deskripsi"],"and","Data Persekot",true);			
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
					/*
					if (this.stsSimpan == 0) {
						sql.add("delete from uin_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from uin_aju_d where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from uin_aju_r where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					*/

					sql.add("insert into uin_aju_m_h(no_aju,kode_lokasi,tanggal,periode,nik_user,tgl_input,no_dokumen,keterangan,nik_buat,jab_buat,nik_app,jab_app,kode_pp,progress,nilai,ppn,pph,jenis,no_fisik,no_ver,no_nota,no_spm,no_sppd,nik_bdh,jabatan_bdh,nilai_pj) "+
							"select no_aju,kode_lokasi,tanggal,periode,nik_user,tgl_input,no_dokumen,keterangan,nik_buat,jab_buat,nik_app,jab_app,kode_pp,progress,nilai,ppn,pph,jenis,no_fisik,no_ver,no_nota,no_spm,no_sppd,nik_bdh,jabatan_bdh,nilai_pj "+
							"from uin_aju_m where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into uin_aju_d_h(no_aju,kode_lokasi,no_urut,kode_norma,keterangan,satuan,tarif,vol,total,tahun,kode_atensi,ppn,pph,dc,idbukti,nu, kdoutput,kdsoutput,kdkmpnen,kdskmpnen,kode_akun,kode_pp,kdsatker,kddept,kdunit,kdprogram,kdgiat) "+
							"select no_aju,kode_lokasi,no_urut,kode_norma,keterangan,satuan,tarif,vol,total,tahun,kode_atensi,ppn,pph,dc,idbukti,nu, kdoutput,kdsoutput,kdkmpnen,kdskmpnen,kode_akun,kode_pp,kdsatker,kddept,kdunit,kdprogram,kdgiat "+
							"from uin_aju_d where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					sql.add("delete from uin_aju_m where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into uin_aju_m(no_aju,kode_lokasi,tanggal,periode,nik_user,tgl_input,no_dokumen,keterangan,nik_buat,jab_buat,nik_app,jab_app,kode_pp,progress,nilai,ppn,pph,jenis,no_fisik,no_ver,no_nota,no_spm,no_sppd,nik_bdh,jabatan_bdh,nilai_pj) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.periode+"','"+this.app._userLog+"',getdate(),'-','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','-','"+this.cb_app.getText()+"','-','"+this.cb_pp.getText()+"','0',"+nilaiToFloat(this.e_total.getText())+","+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_pph.getText())+",'"+this.c_jenis.getText()+"','-','-','-','-','-','"+this.cb_bdh.getText()+"','-',"+nilaiToFloat(this.e_nilaipj.getText())+")");					

									
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
	/*
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from uin_aju_m where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from uin_aju_d where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from uin_aju_r where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	*/
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg1.clear(1); this.sg2.clear(1);
					setTipeButton(tbAllFalse);	
					this.pc1.setActivePage(this.pc1.childPage[0]);				
					this.pc2.setActivePage(this.pc2.childPage[0]);				
				}
				break;
			case "simpan" :	
			case "ubah" :									
				for (var i=0;i < this.sg2.getRowCount();i++){
					if (nilaiToFloat(this.sg2.cells(7,i)) > nilaiToFloat(this.sg2.cells(6,i))) {
						system.alert(this,"Transaksi tidak valid.","Nilai Pengajuan melebihi Saldo Anggaran. (KdAkun : "+this.sg2.cells(5,i)+") ");
						return false;
					}
				}					
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Pengajuan harus lebih dari nol.");
					return false;
				}
				else
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.c_tahun.setText(y);
		this.periode = (y+""+m);		
		
		if (this.stsSimpan == 1) {
			this.isiCBaju();					
		}
	},	
	doChange: function(sender){
		try{
			if (sender==this.cb_pp && this.cb_pp.getText()!="") {				
				this.cb_buat.setSQL("select a.nik, a.nama from karyawan a inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.cb_pp.getText()+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
				this.cb_app.setSQL("select a.nik, a.nama from karyawan a inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.kode_pp='"+this.cb_pp.getText()+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);				
			}
			if (sender == this.e_nb && this.e_nb.getText()!="") {		
				var data = this.dbLib.getDataProvider("select a.* from uin_aju_m a where a.no_aju='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.dp_d1.setText(line.tanggal);											
						this.e_ket.setText(line.keterangan);
						this.c_jenis.setText(line.jenis);
						this.cb_buat.setText(line.nik_buat);	
						this.cb_app.setText(line.nik_app);	
						this.cb_bdh.setText(line.nik_bdh);		
						this.e_nilaipj.setText(floatToNilai(line.nilai_pj));					
					} 
				}			
				var strSQL = "select a.*,c.nama as atensi, a.total-a.ppn-a.pph as neto,  a.idbukti+cast(a.nu as varchar) as iditem "+
							"from uin_aju_d a inner join uin_atensi c on a.kode_atensi=c.kode_atensi and a.kode_lokasi=c.kode_lokasi "+
							"where a.no_aju = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.kode_atensi,line.atensi,line.keterangan,line.iditem,line.satuan,floatToNilai(line.tarif),floatToNilai(line.vol),floatToNilai(line.total),floatToNilai(line.ppn),floatToNilai(line.pph),floatToNilai(line.neto),line.kdoutput,line.kdsoutput,line.kdkmpnen,line.kdskmpnen,line.kode_akun,line.idbukti,line.nu,line.kdgiat]);
					}					
				} else this.sg1.clear(1);	
				this.sg1.validasi();

				var strSQL = "select * from uin_aju_r where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.kdgiat,line.kdoutput,line.kdsoutput,line.kdkmpnen,line.kdskmpnen,line.kode_akun,floatToNilai(line.saldo),floatToNilai(line.nilai)]);
					}					
				} else this.sg2.clear(1);	

				var sisa = nilaiToFloat(this.e_neto.getText()) - nilaiToFloat(this.e_nilaipj.getText());
				this.e_sisa.setText(floatToNilai(sisa));					
				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},				
	doNilaiChange1: function(){
		try{
			var tot=ppn=pph=neto=0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(7,i) != ""){					
					tot += nilaiToFloat(this.sg1.cells(7,i));	
					ppn += nilaiToFloat(this.sg1.cells(8,i));					
					pph += nilaiToFloat(this.sg1.cells(9,i));					
					neto += nilaiToFloat(this.sg1.cells(10,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
			this.e_ppn.setText(floatToNilai(ppn));			
			this.e_pph.setText(floatToNilai(pph));			
			this.e_neto.setText(floatToNilai(neto));			
		}catch(e)
		{
			alert("doNilaiChange1: "+e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
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