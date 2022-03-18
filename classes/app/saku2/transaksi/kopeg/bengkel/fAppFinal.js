window.app_saku2_transaksi_kopeg_bengkel_fAppFinal = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_bengkel_fAppFinal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_bengkel_fAppFinal";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Invoice: Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,500], childPage:["Data SPK","Detail SPK","Catatan","Filter Data"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:12,tag:0,
		            colTitle:["No SPK","Tanggal","Status","Customer","No Polisi","Tipe","Keluhan","Merk KBM","Tahun","Jenis","Status","SA"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[150,60,50,50,100,250,150,100,200,60,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true,visible:false});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],visible:false}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Final",maxLength:30,readOnly:true,visible:false});		
				
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,10,202,20],caption:"Status Approval",items:["CASH","NONCASH","CANCEL"], readOnly:true,tag:2});		
		this.e_nospk = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,202,20],caption:"No SPK", readOnly:true});						
		this.e_jenis = new saiLabelEdit(this.pc1.childPage[1],{bound:[268,13,202,20],caption:"Jenis", readOnly:true});						
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,450,20],caption:"Tanggal", readOnly:true});										
		this.e_nopol = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"No Polisi", readOnly:true});						
		this.e_merk = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,14,450,20],caption:"Mek KBM - Tahun", readOnly:true});								
		this.e_cust = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"Customer", maxLenght:50});												
		this.e_tipe = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,450,20],caption:"Tipe - Merk AC", readOnly:true});
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,450,20],caption:"Alamat", readOnly:true});												
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,450,20],caption:"No Telpon", readOnly:true});												
		this.e_keluhan = new saiMemo(this.pc1.childPage[1],{bound:[20,12,450,50],caption:"Keluhan",tag:9});				
		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,21,202,20],caption:"Total Part", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.e_diskon = new saiLabelEdit(this.pc1.childPage[1],{bound:[268,21,202,20],caption:"Diskon", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,21,202,20],caption:"PPN", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});								
		this.e_service = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,22,202,20],caption:"Service Charge", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
		this.e_sblm = new saiLabelEdit(this.pc1.childPage[1],{bound:[268,22,202,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,22,202,20],caption:"Total+", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,20,this.pc1.width-10,this.pc1.height-215],colCount:9,tag:9,
		            colTitle:["Kode","Nama","No Brg","Tipe","Satuan","Jumlah","Harga","Total","Jenis"],					
					colWidth:[[8,7,6,5,4,3,2,1,0],[50,80,80,80,40,150,150,200,100]],					
					colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],					
					columnReadOnly:[true,[1,2,3,4,5,7,8],[6]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
				
		
		this.e_s = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,200,20],caption:"Suction (S)", tag:9,readOnly:true});
		this.e_p = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,200,20],caption:"Pressure (P)", tag:9,readOnly:true});
		this.e_kmasal = new saiLabelEdit(this.pc1.childPage[2],{bound:[270,12,202,20],caption:"KM Asal", tipeText:ttNilai, text:"0",readOnly:true});																
		this.e_t = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,200,20],caption:"Temperature (T)",tag:9, readOnly:true});
		this.e_km = new saiLabelEdit(this.pc1.childPage[2],{bound:[270,13,202,20],caption:"KM Kembali", tipeText:ttNilai, text:"0"});														
		this.e_memosa = new saiMemo(this.pc1.childPage[2],{bound:[20,16,450,100],caption:"Catatan SA",tag:9,readOnly:true});
		
		this.e_sa = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,18,450,20],caption:"SA", readOnly:true});																
		this.e_memojasa = new saiMemo(this.pc1.childPage[2],{bound:[20,16,450,80],caption:"Keterangan Jasa",tag:9});		
		this.e_memo = new saiMemo(this.pc1.childPage[2],{bound:[520,16,450,80],caption:"Catatan Invoice",tag:9});
		
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,11,200,20],caption:"No SPK",tag:9});
		this.e_nopolisi = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,12,200,20],caption:"No Polisi",tag:9});
		this.bCari = new button(this.pc1.childPage[3],{bound:[230,12,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);
			
		setTipeButton(tbSimpan);
		this.hitPPN = "1";
		this.e_memosa.setReadOnly(true);
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
			var data = this.dbLib.getDataProvider("select kode_gudang from fri_petugas where nik ='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.kodeGudang = line.kode_gudang;
				} 				
			}			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			this.e_keluhan.setReadOnly(true);
			this.c_status.setText("");
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('BKLAIM','PIUCAR','PIUBUS','PGANTI','PINSTAL','PJASA','HUTPPN','BRGPOT') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "BKLAIM") this.akunBeban = line.flag;
					if (line.kode_spro == "PIUCAR") this.piuCar = line.flag;
					if (line.kode_spro == "PIUBUS") this.piuBus = line.flag;
					if (line.kode_spro == "PGANTI") this.akunGanti = line.flag;			
					if (line.kode_spro == "PINSTAL") this.akunInstal = line.flag;			
					if (line.kode_spro == "PJASA") this.akunJasa = line.flag;			
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;								
					if (line.kode_spro == "BRGPOT") this.akunPot = line.flag;			
				}
			}
			this.lapView = true;
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_bengkel_fAppFinal.extend(window.childForm);
window.app_saku2_transaksi_kopeg_bengkel_fAppFinal.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fri_jual_m","no_jual",this.app._lokasi+"-FPU"+this.e_periode.getText().substr(2,4)+".","00000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					sql.add("update fri_spk_m set no_jual='"+this.e_nb.getText()+"',progress='3',cust='"+this.e_cust.getText()+"' where no_spk='"+this.e_nospk.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.jenis == "BUS") var akunInv = this.piuBus; else var akunInv = this.piuCar; 
					if (this.status == "INSTALASI") var akunPdpt = this.akunInstal; else var akunPdpt = this.akunGanti;
					
					if (this.c_status.getText() == "CASH") var noKas = "-";                //<---------------- dijurnal sebagai piutang
					if (this.c_status.getText() == "NONCASH") {                            //<---------------- data dijurnal sebagai beban (KLAIM)
						var noKas = this.e_nb.getText(); 
						var akunInv = this.akunBeban; 
					} 
					if (this.c_status.getText() == "CANCEL") var noKas = "CANCEL";         //<---------------- data dibatalkan tidak dihapus (tidak dijurnal)
					
					sql.add("insert into fri_jual_m(no_jual,kode_lokasi,tanggal,no_dokumen,keterangan,kode_gudang,periode,nik_user,tgl_input,nilai,nilai_ppn,nilai_diskon,nilai_service,kode_cust,no_kas,posted,catatan,jenis,ket_jasa,km,akun_piutang) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_nospk.getText()+"','"+this.e_nospk.getText()+"','"+this.kodeGudang+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_diskon.getText())+","+nilaiToFloat(this.e_service.getText())+",'-','"+noKas+"','F','"+this.e_memo.getText()+"','"+this.jenis+"','"+this.e_memojasa.getText()+"',"+parseNilai(this.e_km.getText())+",'"+akunInv+"')");
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){																			
								sql.add("insert into fri_jual_d(no_jual,kode_lokasi,periode,nu,kode_brg,kode_gudang,satuan,jumlah,bonus,harga,hpp,diskon,item) values "+  
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+i+",'"+this.sg1.cells(0,i)+"','"+this.kodeGudang+"','"+this.sg1.cells(4,i)+"',"+nilaiToFloat(this.sg1.cells(5,i))+",0,"+nilaiToFloat(this.sg1.cells(6,i))+",0,0,'"+this.sg1.cells(1,i)+"')");
							}
						}						
					}
					
					//hanya yg cash yg dijurnal; cancel = batal transaksi tp tidak dihapus;  noncash = klaim = tidak dijurnal di FO tp dibagian akuntansi menjurnal harga pokok (sistem hanya jurnal harga jual); 
					if (this.c_status.getText() == "CASH") {					
						sql.add("insert into fri_jual_j(no_jual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+akunInv+"','"+this.e_cust.getText()+"','D',"+nilaiToFloat(this.e_total.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SPK','PIU','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
						sql.add("insert into fri_jual_j(no_jual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunPot+"','"+this.e_cust.getText()+"','D',"+nilaiToFloat(this.e_diskon.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SPK','POT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
						
						sql.add("insert into fri_jual_j(no_jual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',2,'"+akunPdpt+"','"+this.e_cust.getText()+"','C',"+nilaiToFloat(this.e_nilai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SPK','PDPT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
						sql.add("insert into fri_jual_j(no_jual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',3,'"+this.akunJasa+"','"+this.e_cust.getText()+"','C',"+nilaiToFloat(this.e_service.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SPK','JASA','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
						sql.add("insert into fri_jual_j(no_jual,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
								"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',4,'"+this.akunPPN+"','"+this.e_cust.getText()+"','C',"+nilaiToFloat(this.e_ppn.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','SPK','PPN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					this.sg.clear(1); this.sg1.clear(1); 
					this.doClick(this.i_gen);
					this.doLoad();
					this.e_memo.setText("-");
					this.c_status.setText("");
					this.pc1.setActivePage(this.pc1.childPage[0]);											
					setTipeButton(tbSimpan);
				break;
			case "simpan" :
				this.hitPPN = "0";
				this.sg1.validasi();				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
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
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
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
		this.doClick(this.i_gen);
		this.doLoad();
	},	
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fri_jual_m","no_jual",this.app._lokasi+"-FPU"+this.e_periode.getText().substr(2,4)+".","00000"));
		}		
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {							
				this.hitPPN = "1";
				this.pc1.setActivePage(this.pc1.childPage[1]);						
				this.e_nospk.setText(this.sg.cells(0,row));			
				this.e_jenis.setText(this.sg.cells(9,row)+" - "+this.sg.cells(10,row));			
				this.e_nopol.setText(this.sg.cells(4,row));			
				this.e_merk.setText(this.sg.cells(7,row) +" "+this.sg.cells(8,row));			
				this.e_keluhan.setText(this.sg.cells(6,row));		
				this.e_tipe.setText(this.sg.cells(5,row));							
				this.e_tgl.setText(this.sg.cells(1,row));			
				this.e_memo.setText("-");
				this.jenis = this.sg.cells(9,row);
				this.status = this.sg.cells(10,row);
				
				var data = this.dbLib.getDataProvider("select a.*,b.nik+' - '+b.nama as sa,a.km from fri_spk_m a "+
						   "inner join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi "+						   
				           "where a.no_spk='"+this.e_nospk.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.e_cust.setText(line.cust);
						this.e_alamat.setText(line.alamat);
						this.e_tel.setText(line.no_tel);
						this.e_service.setText(floatToNilai(line.nilai_service));
						this.e_sa.setText(line.sa);
						this.e_memosa.setText(line.catatan);
						this.e_kmasal.setText(floatToNilai(line.km));
						this.e_s.setText(line.s);
						this.e_p.setText(line.p);
						this.e_t.setText(line.t);
					} 
				}
				
				var strSQL = "select 'INV' as jenis,b.kode_brg,b.nama+' - '+c.nama+' - '+d.nama as nama,b.no_brg,b.tipe,b.satuan,sum(a.jml) as jml,b.hj,sum((a.jml*b.hj)) as total "+
							 "from "+
							 "( "+
							 "	select kode_lokasi,kode_brg,sum(jumlah) as jml from fri_spk_d where no_spk = '"+this.e_nospk.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_lokasi,kode_brg  "+
							 "	union all  "+
							 "	select kode_lokasi,kode_brg,sum(jumlah*-1) as jml from fri_io_d where no_spk = '"+this.e_nospk.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_lokasi,kode_brg "+
							 ") a "+
							 "inner join fri_barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi     "+
							 "inner join fri_barang_jenis c on b.kode_jenis=c.kode_jenis and b.kode_lokasi=c.kode_lokasi "+
							 "inner join fri_barang_kbm d on b.kode_kbm=d.kode_kbm and b.kode_lokasi=d.kode_lokasi "+
							 "group by b.kode_brg,b.nama,c.nama,d.nama,b.no_brg,b.tipe,b.satuan,b.hj "+							 
							 "union all "+							 
							 "select 'NON' as jenis,'-' as kode_brg,a.item as nama,'-' as no_brg,'-' as tipe,a.satuan,sum(a.jml),0 as hj,0 as total "+
							 "from "+
							 "("+
							 "   select item,satuan,sum(jumlah) as jml from fri_spknon_d where no_spk = '"+this.e_nospk.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by item,satuan "+ 
				             "   union all "+
							 "   select item,satuan,sum(jumlah*-1) as jml from fri_ionon_d where no_spk = '"+this.e_nospk.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by item,satuan "+  
							 ") a group by a.item,a.satuan";
							 				
				var data1 = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg1.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];							
						this.sg1.appendData([line1.kode_brg,line1.nama,line1.no_brg,line1.tipe,line1.satuan,floatToNilai(line1.jml),floatToNilai(line1.hj),floatToNilai(line1.total),line1.jenis.toUpperCase()]);
					}
				}
				this.sg1.validasi();
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select no_spk,convert(varchar,a.tanggal,103) as tanggal,case a.progress when '2' then 'FINAL' end as status,a.cust,a.no_polisi,a.tipe,a.keluhan,a.merk,a.tahun,jenis,a.status as sts,b.nik+'-'+b.nama as sa "+
		             "from fri_spk_m a "+					 
		             "inner join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi "+					 					 					 
					 "where a.periode<='"+this.e_periode.getText()+"' and a.progress = '2' and a.kode_gudang='"+this.kodeGudang+"' and a.no_jual='-'";			
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
	},
	doCari:function(sender){						
		var filter = "";		
		if (this.e_nobukti.getText()!="") filter = " where a.progress = '2' and a.no_spk='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_gudang='"+this.kodeGudang+"'  and a.no_jual='-'";
		if (this.e_nopolisi.getText()!="") filter = " where a.progress = '2' and a.no_polisi like '%"+this.e_nopolisi.getText()+"%' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_gudang='"+this.kodeGudang+"'  and a.no_jual='-'";
		if (filter != "") {
			var strSQL = "select no_spk,convert(varchar,a.tanggal,103) as tanggal,case a.progress when '2' then 'FINAL' end as status,a.cust,a.no_polisi,a.tipe,a.keluhan,a.merk,a.tahun,jenis,a.status as sts "+
						 "from fri_spk_m a "+					 
						 "inner join karyawan b on a.nik_mekanik=b.nik and a.kode_lokasi=b.kode_lokasi "+filter;					
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);
		}
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.no_spk,line.tanggal,line.status.toUpperCase(),line.cust,line.no_polisi,line.tipe,line.keluhan,line.merk,line.tahun,line.jenis,line.sts,line.sa]);
		}
		this.sg.setNoUrut(start);
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
							if (this.lapView == "1") {
								this.nama_report="server_report_saku2_kopeg_bengkel_rptFaktur";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_jual='"+this.e_nb.getText()+"' ";
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
								this.pc1.hide();
							}
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doChangeCell: function(sender, col, row){			
		if (col == 6) {
			if (this.sg1.cells(5,row) != "" && this.sg1.cells(6,row) != "" ) {
				this.sg1.cells(7,row,floatToNilai(Math.round(nilaiToFloat(this.sg1.cells(5,row)) * nilaiToFloat(this.sg1.cells(6,row)))));
			}
		}
		this.sg1.validasi();
	},	
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(7,i) != ""){
					tot += nilaiToFloat(this.sg1.cells(7,i));										
				}
			}						
			this.e_nilai.setText(floatToNilai(tot));						
			this.e_sblm.setText(floatToNilai(tot+nilaiToFloat(this.e_service.getText())-nilaiToFloat(this.e_diskon.getText())));	
			if (this.hitPPN=="1") this.e_ppn.setText(floatToNilai(Math.round(nilaiToFloat(this.e_sblm.getText()) * 0.1)));
			this.e_total.setText(floatToNilai(tot+nilaiToFloat(this.e_service.getText())-nilaiToFloat(this.e_diskon.getText())+nilaiToFloat(this.e_ppn.getText())));	
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doChange:function(sender){				
		if (sender == this.e_ppn) {						
			this.e_total.setText(floatToNilai(nilaiToFloat(this.e_sblm.getText()) + nilaiToFloat(this.e_ppn.getText())));
		}
		if (sender == this.e_service || sender == this.e_diskon) {						
			if (this.e_service.getText()!="") {
				this.e_sblm.setText(floatToNilai(nilaiToFloat(this.e_service.getText()) + nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_diskon.getText()))); 				
				this.e_ppn.setText(floatToNilai(Math.round(nilaiToFloat(this.e_sblm.getText()) * 0.1)));
				this.e_total.setText(floatToNilai(nilaiToFloat(this.e_sblm.getText()) + nilaiToFloat(this.e_ppn.getText())));
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
			this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
			this.sg.clear(1); this.sg1.clear(1); 
			this.doClick(this.i_gen);
			this.doLoad();
			this.e_memo.setText("-");
			this.c_status.setText("");
			this.pc1.setActivePage(this.pc1.childPage[0]);											
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});