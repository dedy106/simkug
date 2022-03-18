window.app_saku3_transaksi_tu_ntf21_fProyekAman = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_ntf21_fProyekAman.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_ntf21_fProyekAman";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Amandemen Proyek", 0);			

		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Proyek"]});						
		this.l_tgl3 = new portalui_label(this.pc2.childPage[0],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 						
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,996,394], childPage:["Data Proyek","Distribusi Akru","File Dokumen","Detail RAB","Inisiasi Unit","Cattn Memo","Customer"]});						
		this.cb_kode = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"ID Proyek", multiSelection:false, change:[this,"doChange"]});			
		this.cb_pp = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[520,12,220,20],caption:"PP Proyek",tag:2, readOnly:true, change:[this,"doChange"]}); 							
		this.cb_pprab = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"PP RAB",tag:2, readOnly:true}); 					
		this.cb_buat = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[520,14,220,20],caption:"Dibuat Oleh",tag:2,multiSelection:false});				
		this.cb_ppkelola = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Unit Pengelola",tag:1,readOnly:true}); 	
		this.cb_app = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[520,15,220,20],caption:"Png. Jawab",tag:2,multiSelection:false}); 								
		this.cb_rab = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"No RAB [Verified]",tag:9,change:[this,"doChange"],readOnly:true}); 				
		this.c_stsva = new saiCB(this.pc1.childPage[0],{bound:[520,11,200,20],caption:"Permintaan VA",items:["YA","TIDAK"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,430,20],caption:"No Kontrak", maxLength:50, tag:1});			
		this.e_bank = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,10,430,20],caption:"Bank VA", maxLength:100, tag:1});							
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,430,20],caption:"Deskripsi", maxLength:200, tag:1});			
		this.e_namarek = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,11,430,20],caption:"Nama Rekening", maxLength:100, tag:1});									
		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18],selectDate:[this,"doSelectDate2"]}); 				
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[260,13,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[350,13,98,18],selectDate:[this,"doSelectDate2"]}); 		
		this.e_norek = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,13,430,20],caption:"No Rekening", maxLength:50, tag:1, tipeText:ttAngka});							
		this.l_tgl4 = new portalui_label(this.pc1.childPage[0],{bound:[20,15,100,18],caption:"TglMax Adminstrsi", underline:true});
		this.dp_d4 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,15,98,18]}); 		
		this.cb_jenis = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Jenis",tag:2,multiSelection:false}); 						
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0",readOnly:true, change:[this,"doChange"]});
		this.e_persenor = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Persen OR", tag:1, tipeText:ttNilai, text:"0",readOnly:true});								//,change:[this,"doChange"]
		this.e_nilaior = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Nilai OR", tag:1, tipeText:ttNilai, text:"0", readOnly:true});												
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0", visible:true});	
		this.bPPN = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,13,20,20],hint:"Hitung PPN",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungPajak"]});						
		this.e_jumlah = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Jml Jadwal", tag:1, tipeText:ttNilai, text:"0"});	
		this.bJadwal = new button(this.pc1.childPage[0],{bound:[235,14,80,18],caption:"Buat Jadwal",click:[this,"doJadwal"]});					
		this.e_join = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Ni JoinCost", tag:1, tipeText:ttNilai, text:"0",readOnly:true});			
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
				colTitle:["Periode","Nilai Pend","Nilai Beban"],
				colWidth:[[2,1,0],[150,150,100]],
				columnReadOnly:[true,[0],[]],
				colFormat:[[1,2],[cfNilai,cfNilai]],	
				nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCells"],autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.sg1mp2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-4,this.pc1.height-33],colCount:4,readOnly:true,tag:9,
				colTitle:["Kd Jenis","Jenis Dokumen","Path File","DownLoad"],
				colWidth:[[3,2,1,0],[80,480,200,80]],
				rowCount:1,colFormat:[[3],[cfButton]],click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]]});
		this.sgn2 = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width - 1,25],buttonStyle:3,pager:[this,"doPager2"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});            
	
		this.e_pph4 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,10,200,20],caption:"Nilai Pajak PPh", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.sgr = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-63],colCount:5,tag:1,
				colTitle:["Kegiatan","Quantity","Harga Satuan","SubTotal","Jenis"],
				colWidth:[[4,3,2,1,0],[80,100,100,100,500]],				
				colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],	
				buttonStyle:[[4],[bsAuto]], 
				picklist:[[4],[new portalui_arrayMap({items:["PDPT","BEBAN"]})]],checkItem: true,
				nilaiChange:[this,"doNilaiChanger"],change:[this,"doChangeCellsr"],
				autoAppend:true,defaultRow:1});
		this.sgnr = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sgr});		
			
		this.sg6 = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:8,tag:9,
				colTitle:["No Agenda","Keterangan","ID Kegiatan","Deskripsi","Nilai Agenda","Tot JoinCost","Saldo Agenda","Ni JoinCost"],
				colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,100,250,120,200,100]],
				colHide:[[4,5],[true,true]],
				columnReadOnly:[true,[0,1,2,3,4,5,6],[7]],
				colFormat:[[4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai]],
				nilaiChange:[this,"doNilaiChange6"],change:[this,"doChangeCell6"],	
				autoAppend:false,defaultRow:1});
		this.sgn6 = new portalui_sgNavigator(this.pc1.childPage[4],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg6});		

		this.sgctt = new saiGrid(this.pc1.childPage[5],{bound:[1,5,this.pc1.width-12,this.pc1.height-15],colCount:1,tag:9, 
			colTitle:["Catatan"],
			colWidth:[[0],[100]],					
			readOnly:true,autoAppend:false,defaultRow:1});
		
		this.cb_cust = new portalui_saiCBBL(this.pc1.childPage[6],{bound:[20,14,220,20],caption:"Kode Cust",tag:2,readOnly:true});
		this.e_namacust = new saiLabelEdit(this.pc1.childPage[6],{bound:[20,11,500,20],caption:"Nama Customer", maxLength:50, tag:1});	
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[6],{bound:[20,12,500,20],caption:"Alamat", maxLength:150, tag:1});					
		this.e_tel = new saiLabelEdit(this.pc1.childPage[6],{bound:[20,13,500,20],caption:"No Telpon", maxLength:50, tag:1});							
		this.e_mail = new saiLabelEdit(this.pc1.childPage[6],{bound:[20,15,500,20],caption:"Email", maxLength:50, tag:1});	
		this.e_npwp = new saiLabelEdit(this.pc1.childPage[6],{bound:[20,16,500,20],caption:"NPWP", maxLength:50, tag:1});	
		this.e_alamat2 = new saiLabelEdit(this.pc1.childPage[6],{bound:[20,17,500,20],caption:"Alamat NPWP", maxLength:150, tag:1});	
		this.e_pic = new saiLabelEdit(this.pc1.childPage[6],{bound:[20,18,500,20],caption:"P I C", maxLength:50, tag:1});			
		this.e_jabatan = new saiLabelEdit(this.pc1.childPage[6],{bound:[20,19,500,20],caption:"Jabatan", maxLength:50, tag:1});		
		this.cb_piu = new portalui_saiCBBL(this.pc1.childPage[6],{bound:[20,14,220,20],caption:"Akun Piutang",tag:2,multiSelection:false});				

		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);	
		this.pc1.childPage[6].rearrangeChild(10, 23);	

		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[520,10,430,60],caption:"Catatan NTF",tag:9});		
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true); 
			this.cb_jenis.setSQL("select kode_jenis,nama from prb_proyek_jenis where kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis",true);
			this.cb_piu.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='003' where a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);
		
			this.cb_app.setSQL("select nik,nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_pprab.setSQL("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' "+
							     "where a.flag_aktif='1' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_ppkelola.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
			this.cb_buat.setSQL("select a.nik,a.nama from karyawan a inner join karyawan_pp b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							   	"where a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["Kode","Nama"],"and","Data Karyawan",true);
			
			this.doLoadCtt(this.cb_rab.getText());

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_ntf21_fProyekAman.extend(window.childForm);
window.app_saku3_transaksi_tu_ntf21_fProyekAman.implement({	
	doHitungPajak: function(sender){
		var sepuluhPersen = 0.1 * nilaiToFloat(this.e_nilai.getText());
		this.e_ppn.setText(floatToNilai(sepuluhPersen));		
	},
	doChangeCellsr: function(sender, col, row){
		if ((col == 1 || col == 2) && this.sgr.cells(1,row) != "" && this.sgr.cells(2,row) != "") this.sgr.validasi();				
	},
	doNilaiChanger: function(){
		try{
			var beban = pdpt = 0;
			for (var i = 0; i < this.sgr.getRowCount();i++){
				if (this.sgr.cells(1,i) != "" && this.sgr.cells(2,i) != ""){
					var subttl = Math.round(nilaiToFloat(this.sgr.cells(1,i)) * nilaiToFloat(this.sgr.cells(2,i)) * 100) / 100; 
					this.sgr.cells(3,i,subttl);

					if (this.sgr.cells(4,i) == "BEBAN") beban += nilaiToFloat(this.sgr.cells(3,i));	
					else pdpt += nilaiToFloat(this.sgr.cells(3,i));					
				}
			}						
			
			beban += nilaiToFloat(this.e_pph4.getText());
			
			this.e_nilai.setText(floatToNilai(pdpt));			
			this.e_nilaior.setText(floatToNilai(beban));

			if (pdpt != 0) var persenOR = Math.round((beban/pdpt) * 10000) /100;
			else var persenOR = 0;

			this.e_persenor.setText(floatToNilai(persenOR));
			
		}catch(e)
		{
			alert(e);
		}
	},	
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 3)
				window.open("server/media/"+this.sg1mp2.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},	
	doJadwal: function(sender){
		try{			
			if (this.periode != "" && this.e_jumlah.getText() != "") {
				this.sg.clear(1);
				
				var tot = totb = 0;
				var jum = nilaiToFloat(this.e_jumlah.getText());
				var nilai = Math.round(nilaiToFloat(this.e_nilai.getText()) / nilaiToFloat(this.e_jumlah.getText()));
				var nilaior = Math.round( (nilaiToFloat(this.e_nilaior.getText())) / nilaiToFloat(this.e_jumlah.getText())) ; 
				
				var period = this.dp_d1.getText().substr(6,4)+this.dp_d1.getText().substr(3,2);				
				for (var i=0;i < jum;i++){
					this.sg.appendData([period,floatToNilai(nilai),floatToNilai(nilaior)]);
					period = getNextPeriode(period);	
					tot += nilai;	
					totb += nilaior;	
				}		
					
				nilai = nilaiToFloat(this.e_nilai.getText()) - tot;
				nilai = nilai + nilaiToFloat(this.sg.cells(1,i-1));
				this.sg.cells(1,i-1,nilai);				
				
				nilaior = nilaiToFloat(this.e_nilaior.getText()) - totb; 
				nilaior = nilaior + nilaiToFloat(this.sg.cells(2,i-1));
				this.sg.cells(2,i-1,nilaior);				
																			
				this.pc1.setActivePage(this.pc1.childPage[2]);			
			} 
			else {
				system.alert(this,"Periode dan jumlah harus valid.","Filter dari tanggal mulai.");
				this.sg1.clear(1);
			}
		}catch(e){
			systemAPI.alert(e);
		}
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])) {
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					var strSQL = "select count(*) as ke from prb_proyek_his where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";										
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){		
							var ke = line.ke;
						}
					}

					//bckup	
					sql.add("insert into prb_ntf_his(kode_proyek,nama,flag_aktif,kode_lokasi,no_pks,kode_pp,kode_cust,tgl_mulai,tgl_selesai,nilai,nilai_or,p_or,kode_jenis,nilai_ppn,pph42,jumlah,  nik_app,progress,no_app, tgl_app,modul,nik_buat, bank,nama_rek,no_rek, tgl_admin, pp_rab,versi,ke) "+
							"select kode_proyek,nama,flag_aktif,kode_lokasi,no_pks,kode_pp,kode_cust,tgl_mulai,tgl_selesai,nilai,nilai_or,p_or,kode_jenis,nilai_ppn,pph42,jumlah,  nik_app,progress,no_app, tgl_app,modul,nik_buat, bank,nama_rek,no_rek, tgl_admin, pp_rab,versi,"+ke+" "+
							"from prb_proyek "+
							"where kode_proyek ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into prb_ntf_d_his(kode_proyek,kode_lokasi,nu,periode,nilai_pend,nilai_beban,ke) "+
							"select kode_proyek,kode_lokasi,nu,periode,nilai_pend,nilai_beban,"+ke+" from prb_proyek_d where kode_proyek ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					sql.add("insert into prb_ntf_rab_his(ke,kode_proyek,no_rab,kode_lokasi,nu,keterangan,jumlah,harga,total,jenis) "+
							"select "+ke+",'"+this.cb_kode.getText()+"',no_rab,kode_lokasi,nu,keterangan,jumlah,harga,total,jenis "+
							"from prb_rabapp_d where no_rab='"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"'"); //ambil dr rabver bukan rabaju
					//bckup	


					//--- transaksi baru
					sql.add("delete from prb_proyek where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from prb_proyek_d where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");																			
					
					var noApp = this.standarLib.noBuktiOtomatis(this.dbLib,"prb_proyek_app","no_app",this.app._lokasi+"-AM"+this.periode.substr(2,4)+".","0000");				
					sql.add("update prb_proyek_app set no_appseb = '"+noApp+"' where no_appseb ='-' and no_bukti='"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='NTF_RAB' ");
					sql.add("insert into prb_proyek_app (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,no_bukti,modul,no_appseb,catatan,no_rab,nik_app) values "+
					 		"('"+noApp+"','"+this.dp_d3.getDateString()+"','"+this.app._lokasi+"','"+this.periode+"','"+this.app._userLog+"',getdate(),'APPROVE','"+this.cb_kode.getText()+"','NTF_RAB','-','"+this.e_memo.getText()+"','"+this.cb_rab.getText()+"','-')");
					sql.add("update prb_rabapp_m set no_appntf='"+noApp+"' where no_rab='"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");	
					
					//--keep noproyek (progress Y = utk approve di viewer RAB)
					sql.add("insert into prb_proyek(kode_proyek,nama,flag_aktif,kode_lokasi,no_pks,kode_pp,kode_cust,tgl_mulai,tgl_selesai,nilai,nilai_or,p_or,kode_jenis,nilai_ppn,pph42,jumlah,  nik_app,progress,no_app, tgl_app,modul,nik_buat, bank,nama_rek,no_rek, tgl_admin, pp_rab,versi,no_rab,no_nonaktif) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','1','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_cust.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_nilai.getText())+
							","+nilaiToFloat(this.e_nilaior.getText())+","+nilaiToFloat(this.e_persenor.getText())+",'"+this.cb_jenis.getText()+"',"+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_pph4.getText())+","+nilaiToFloat(this.e_jumlah.getText())+",'-','Y','-','"+this.dp_d3.getDateString()+"','PROYEK','"+this.app._userLog+"', '"+
							this.e_bank.getText()+"','"+this.e_namarek.getText()+"','"+this.e_norek.getText()+"','"+this.dp_d4.getDateString()+"','"+this.ppRAB+"','NTF21','"+this.cb_rab.getText()+"','-')"); 
					
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){								
							sql.add("insert into prb_proyek_d(kode_proyek,kode_lokasi,nu,periode,nilai_pend,nilai_beban) values "+
									"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(1,i))+","+nilaiToFloat(this.sg.cells(2,i))+")");
						}
					}

					//delete data rab					
					sql.add("delete from prb_rab_m where no_rab = '"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from prb_rab_d where no_rab = '"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");													
					sql.add("delete from prb_rabapp_m where no_rab='"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from prb_rabapp_d where no_rab='"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");									
					
					sql.add("insert into prb_rab_m(no_rab,keterangan,kode_lokasi,kode_pp,kode_cust,tgl_mulai,tgl_selesai,nilai,nilai_or,p_or,kode_jenis,nik_app,progress,pp_kelola,periode,no_dok,tanggal,nik_buat,cat_app_proyek, no_memo,ppn,pph42, sts_va,bank,nama_rek,no_rek,tgl_admin,versi) values "+
							"('"+this.cb_rab.getText()+"','"+this.e_nama.getText()+"','"+this.app._lokasi+"','"+this.cb_pprab.getText()+"','"+this.cb_cust.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_nilai.getText())+","+
							nilaiToFloat(this.e_nilaior.getText())+","+nilaiToFloat(this.e_persenor.getText())+",'"+this.cb_jenis.getText()+"','"+this.cb_app.getText()+"','0','"+this.cb_ppkelola.getText()+"','"+this.periode+"','"+this.e_dok.getText()+"','"+this.dp_d3.getDateString()+"','"+this.cb_buat.getText()+
							"','-','-',"+nilaiToFloat(this.e_ppn.getText())+","+nilaiToFloat(this.e_pph4.getText())+", '"+this.c_stsva.getText()+"','"+this.e_bank.getText()+"','"+this.e_namarek.getText()+"','"+this.e_norek.getText()+"','"+this.dp_d4.getDateString()+"','NTF21')"); 
					
					for (var i=0;i < this.sgr.getRowCount();i++){
						if (this.sgr.rowValid(i)){								
							sql.add("insert into prb_rab_d(no_rab,kode_lokasi,nu,keterangan,jumlah,harga,total,jenis) values "+
									"('"+this.cb_rab.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sgr.cells(0,i)+"',"+nilaiToFloat(this.sgr.cells(1,i))+","+nilaiToFloat(this.sgr.cells(2,i))+","+nilaiToFloat(this.sgr.cells(3,i))+",'"+this.sgr.cells(4,i)+"')");
						}
					}

					if (nilaiToFloat(this.e_pph4.getText()) != 0) {
						sql.add("insert into prb_rab_d(no_rab,kode_lokasi,nu,keterangan,jumlah,harga,total,jenis) values "+
								"('"+this.cb_rab.getText()+"','"+this.app._lokasi+"',999,'PPh Atas RAB: "+this.cb_rab.getText()+"',1,"+nilaiToFloat(this.e_pph4.getText())+","+nilaiToFloat(this.e_pph4.getText())+",'BEBAN')");
					}

					//delete data joincost yg pakai nobukti --> no_rab
					sql.add("delete from prb_prbeban_d where no_bukti='"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from prb_prbdd_d where no_bukti='"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					
					for (var i=0;i < this.sg6.getRowCount();i++) {
						if (this.sg6.rowValid(i)) {							
							if (nilaiToFloat(this.sg6.cells(7,i)) != 0) {	
								sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) values "+
										"('"+this.cb_rab.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,0)+"','"+this.sg.cells(0,0)+"','"+this.dp_d1.getDateString()+"','-','"+this.cb_pp.getText()+"','-','"+this.e_nama.getText()+"','C',"+nilaiToFloat(this.sg6.cells(7,i))+",getdate(),'"+this.sg6.cells(2,i)+"','AJUBEBAN','-','NONITAJU')");
								sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) values "+
										"('"+this.cb_rab.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,0)+"','"+this.sg.cells(0,0)+"','"+this.dp_d1.getDateString()+"','-','"+this.cb_pp.getText()+"','-','"+this.e_nama.getText()+"','D',"+nilaiToFloat(this.sg6.cells(7,i))+",getdate(),'"+this.cb_kode.getText()+"','AJUBEBAN','"+this.sg6.cells(0,i)+"','NONITAJU')");																		

								sql.add("insert into prb_prbdd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,keterangan,dc,nilai,tgl_input,nik_user,kode_proyek,form) values "+
										"('"+this.cb_rab.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,0)+"','"+this.dp_d1.getDateString()+"','-','"+this.cb_pp.getText()+"','"+this.e_nama.getText()+"','D',"+nilaiToFloat(this.sg6.cells(7,i))+",getdate(),'"+this.app._userLog+"','"+this.cb_kode.getText()+"','NTF11')");
								sql.add("insert into prb_prbdd_d(no_bukti,kode_lokasi,periode,tanggal,kode_akun,kode_pp,keterangan,dc,nilai,tgl_input,nik_user,kode_proyek,form) values "+
										"('"+this.cb_rab.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,0)+"','"+this.dp_d1.getDateString()+"','-','"+this.cb_pp.getText()+"','"+this.e_nama.getText()+"','C',"+nilaiToFloat(this.sg6.cells(7,i))+",getdate(),'"+this.app._userLog+"','"+this.sg6.cells(2,i)+"','NTF11')");		
							}
						}
					}

					//data pph diinsert sbg beban (realisasi OR)
					sql.add("delete from prb_prbeban_d where no_bukti='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from it_aju_m where no_aju='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from kas_m where no_kas='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	

					sql.add("insert into prb_prbeban_d(no_bukti,kode_lokasi,periode,periode_sch,tanggal,kode_akun,kode_pp,kode_drk,keterangan,dc,nilai,tgl_input,kode_proyek,modul,no_ref1,jenis) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.periode+"','"+this.periode+"','"+this.dp_d1.getDateString()+"','-','"+this.cb_pp.getText()+"','-','"+this.cb_kode.getText()+" | "+this.e_nama.getText()+"','D',"+nilaiToFloat(this.e_pph4.getText())+",getdate(),'"+this.cb_kode.getText()+"','AJUBEBAN','-','NONITAJU')");																		
					sql.add("insert into it_aju_m(no_aju,kode_lokasi,periode,tanggal,modul,kode_akun,kode_pp,kode_drk,keterangan,nilai,tgl_input,nik_user,no_ver,no_fiat,no_kas,progress,nik_panjar,no_ptg,user_input,form,sts_pajak,npajak,no_ref1,dasar) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.periode+"','"+this.dp_d1.getDateString()+"','BILREKON','X','"+this.cb_pp.getText()+"','-','-',"+nilaiToFloat(this.e_pph4.getText())+",getdate(),'"+this.app._userLog+"','Z','Z','"+this.cb_kode.getText()+"','Z','-','-','"+this.app._userLog+"','BILREKON','Z',0,'Z','Z')");						
					sql.add("insert into kas_m(no_kas, kode_lokasi, no_dokumen, no_bg, akun_kb, tanggal, keterangan, kode_pp, modul, jenis, periode, kode_curr, kurs, nilai, nik_buat, tgl_input, nik_user, nik_app, posted, no_del, no_link, ref1, kode_bank) values "+
							"('"+this.cb_kode.getText()+"', '"+this.app._lokasi+"', '-', '-', '-', '"+this.dp_d1.getDateString()+"', '-', '"+this.cb_pp.getText()+"', 'BILREKON', 'BK', '"+this.periode+"', 'IDR', 1, 0, '"+this.app._userLog+"', getdate(), '"+this.app._userLog+"', '"+this.app._userLog+"', 'X', '-', '-', '-', '-')");
					
					//update data customer
					sql.add("delete from prb_rab_cust where no_rab='"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into prb_rab_cust (no_rab,kode_lokasi,kode_cust,nama,alamat,no_tel,email,npwp,alamat2,pic,jabatan,akun_piutang) values "+
							"('"+this.cb_rab.getText()+"','"+this.app._lokasi+"','"+this.cb_cust.getText()+"','"+this.e_namacust.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.e_mail.getText()+"','"+this.e_npwp.getText()+"','"+this.e_alamat2.getText()+"','"+this.e_pic.getText()+"','"+this.e_jabatan.getText()+"','"+this.cb_piu.getText()+"')");


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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;				
					this.e_memo.clear();
					this.sg.clear(1);
					this.sg1mp2.clear(1);					
					this.sg6.clear(1);
					this.sgr.clear(1);					
					this.pc1.setActivePage(this.pc1.childPage[0]);														
				break;
			case "simpan" :							
					var strSQL = "select count(*) as jumlah from prb_prbill_m where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";										
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){									
							if (parseFloat(line.jumlah) != 0) {
								system.alert(this,"Proyek tidak dapat di Amandemen.","Batalkan dulu Tagihan yang sudah dibuat.");
								return false;
							}
						}
					}

					var tot = totb = 0;
					for (var i = 0; i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(1,i) != ""){										
							tot += nilaiToFloat(this.sg.cells(1,i));
							totb += nilaiToFloat(this.sg.cells(2,i));					
						}
					}	
					var d = new Date();
					var d1 = d.strToDate(this.dp_d1.getText());
					var d2 = d.strToDate(this.dp_d2.getText());
					var d4 = d.strToDate(this.dp_d4.getText());
					
					if (d1 > d2) {
						system.alert(this,"Tgl Proyek tidak valid.","Tanggal Mulai harus lebih awal dari Tanggal Selesai");
						return false;
					}
					if (d1 > d4) {						
						system.alert(this,"Tgl Max Administrasi tidak valid.","Tgl Max Administrasi tidak boleh lebih awal dari Tgl Mulai Proyek");
						return false;
					}		

					if (this.c_stsva.getText() == "TIDAK") {
						if (this.e_bank.getText() == "-" || this.e_namarek.getText() == "-" || this.e_norek.getText() == "-") {
							system.alert(this,"Data Bank dan Rekening tidak valid.","Data bank dan rekening tidak boleh '-' (strip)");
							return false;
						}
					}

					if (nilaiToFloat(this.e_nilaior.getText()) < nilaiToFloat(this.e_join.getText())) {
						system.alert(this,"Nilai JoinCost tidak valid.","Nilai JoinCost melebihi Nilai OR.");
						return false;
					}
					if (tot != nilaiToFloat(this.e_nilai.getText())) {
						system.alert(this,"Nilai Proyek tidak valid.","Nilai Proyek dan Total Pendapatan tidak sama.");
						return false;
					}
					if (totb  != nilaiToFloat(this.e_nilaior.getText())) {
						system.alert(this,"Nilai Proyek tidak valid.","Nilai OR dan Total Beban tidak sama.");
						return false;
					}						
					if (this.e_bank.getText() == "-" || this.e_namarek.getText() == "-" || this.e_norek.getText() == "-") {
						system.alert(this,"Data Bank dan Rekening tidak valid.","Data bank dan rekening tidak boleh '-' (strip)");
						return false;
					}
					if (this.sg6.getRowCount() > 0 && this.sg6.rowValid(0)) {
						system.confirm(this, "simpancek", "Terdapat data Saldo Inisiasi","Data yakin akan disimpan?");					
					}			
					else this.simpan();					
				break;				
			case "simpancek" : this.simpan();			
				break;										
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.periode = y+""+m;
		
		var strSQL = "select a.kode_proyek,a.nama from prb_proyek a inner join karyawan_pp b on a.pp_rab=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.versi = 'NTF21' and substring(convert(varchar,a.tgl_mulai,112),1,6) <= '"+this.periode+"' and a.progress in ('1','2') and a.kode_lokasi='"+this.app._lokasi+"' ";
		this.cb_kode.setSQL(strSQL,["kode_proyek","nama"],false,["ID Proyek","Deskripsi"],"and","Data Proyek",true);	
	},
	doSelectDate2: function(sender, y,m,d){		
		var strSQL = "select datediff(month,'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"') + 1  as jml ";																																	 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){														
				this.e_jumlah.setText(floatToNilai(line.jml));								
			}
		}																												 					
	},					
	doChange: function(sender){
		try{		
			if (sender == this.e_pph4 && this.e_pph4.getText() != "") {				
				this.sgr.validasi();
			}	
			
			if (sender == this.cb_kode && this.cb_kode.getText()!="") {				
				var strSQL = "select a.* from prb_proyek a where a.kode_proyek ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.ppRAB = line.pp_rab;
						this.cb_pprab.setText(line.pp_rab);
						this.e_nama.setText(line.nama);
						this.e_dok.setText(line.no_pks);						
						this.cb_pp.setText(line.kode_pp);
						this.cb_cust.setText(line.kode_cust);												
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);	
						this.dp_d4.setText(line.tgl_admin);						
						this.e_nilai.setText(floatToNilai(line.nilai));						
						this.e_persenor.setText(floatToNilai(line.p_or));
						this.e_nilaior.setText(floatToNilai(line.nilai_or));
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));
						this.e_pph4.setText(floatToNilai(line.pph42));

						this.e_bank.setText(line.bank);
						this.e_namarek.setText(line.nama_rek);
						this.e_norek.setText(line.no_rek);
						
						this.doSelectDate(this.dp_d3,this.dp_d3.year,this.dp_d3.month,this.dp_d3.day);
						this.cb_jenis.setText(line.kode_jenis);
						this.e_jumlah.setText(floatToNilai(line.jumlah));
						
						var data = this.dbLib.getDataProvider("select * from prb_proyek_d where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sg.appendData([line.periode,floatToNilai(line.nilai_pend),floatToNilai(line.nilai_beban)]);
							}
						} 
						else this.sg.clear(1);	
						
						var strSQL = "select a.no_rab,a.kode_pp,a.pp_kelola,b.nik_app,b.nik_buat,b.sts_va from prb_rabapp_m a inner join prb_rab_m b on a.no_rab=b.no_rab and a.kode_lokasi=b.kode_lokasi where a.kode_proyek='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){									
								this.cb_rab.setText(line.no_rab);
								this.cb_ppkelola.setText(line.pp_kelola);
								this.cb_app.setText(line.nik_app);
								this.cb_buat.setText(line.nik_buat);
								this.c_stsva.setText(line.sts_va);

								var data2 = this.dbLib.getDataProvider("select * from prb_rabapp_d where nu <> 999 and no_rab = '"+this.cb_rab.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by jenis desc,nu",true);
								if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
									var line;
									this.sgr.clear();
									for (var i in data2.rs.rows){
										line = data2.rs.rows[i];												
										this.sgr.appendData([line.keterangan,floatToNilai(line.jumlah),floatToNilai(line.harga),floatToNilai(line.total),line.jenis]);
									}
								} 
								else this.sgr.clear(1);				
								
								this.sg1mp2.clear();
								var data2 = this.dbLib.getDataProvider(
										"select b.kode_jenis,b.nama,a.no_gambar from prb_rab_dok a inner join prb_dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
										"where a.no_rab = '"+this.cb_rab.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
																	
								if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
									var line2;
									this.sg1mp2.clear();
									for (var i in data2.rs.rows){
										line2 = data2.rs.rows[i];										
										this.sg1mp2.appendData([line2.kode_jenis, line2.nama, line2.no_gambar, "DownLoad"]);
									}
								} else this.sg1mp2.clear(1);
								
							}					
						}						
					}					
				}

			}
			
			if (sender == this.cb_rab && this.cb_rab.getText()!="") {	
				var strSQL = "select a.nama,a.alamat,a.no_tel,a.email,a.npwp,a.alamat2,a.pic,a.jabatan, case when a.akun_piutang is null then b.akun_piutang else a.akun_piutang end as akun_piutang "+
							 "from prb_rab_cust a inner join prb_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_rab='"+this.cb_rab.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   											 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.e_namacust.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_tel.setText(line.no_tel);						
						this.e_mail.setText(line.email);
						this.e_npwp.setText(line.npwp);
						this.e_alamat2.setText(line.alamat2);
						this.e_pic.setText(line.pic);	
						this.e_jabatan.setText(line.jabatan);	
						this.cb_piu.setText(line.akun_piutang);
					}
				}
				this.doLoadCtt(this.cb_rab.getText());
			}

		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doChangeCell6: function(sender, col, row){
		if (col == 7 && this.sg6.cells(7,row) != "") this.sg6.validasi();				
	},
	doNilaiChange6: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg6.getRowCount();i++){
				if (this.sg6.cells(7,i) != ""){
					tot += nilaiToFloat(this.sg6.cells(7,i));					
				}
			}						
			this.e_join.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("doNilaiChange6:"+e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();

							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";

						}else system.info(this,result,"");
	    			break;		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},		
	doLoadCtt: function(kode){
		try{
			var strSQL = "select distinct convert(varchar,tanggal,103) as tgl,tanggal from prb_proyek_app "+
						 "where no_rab='"+kode+"' and kode_lokasi='"+this.app._lokasi+"'  "+
						 "order by convert(varchar,tanggal,103) desc";	
			
			var Html = "<link rel='stylesheet' type='text/css' href='bs/css/bootstrap.min.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/AdminLTE.min.css'>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/font-awesome.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/ionicons.css'/>"+
			"<link rel='stylesheet' type='text/css' href='server/bs/css/sai.css'/>"+
			"<script type='text/javascript' src='server/bs/js/jquery.min.js'></script>"+
			"<script type='text/javascript' src='server/bs/js/bootstrap.min.js'></script>"+
			"<div style='padding-top: 10px;padding-left: 10px;max-height: 300px;margin-right:0px' class='row sai-container-overflow'>"+
			"<div class='col-md-6'>"+
			"  <ul class='timeline' style='padding-bottom:10px'>";
		
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					var strSQL2 = "select catatan,no_app, convert(varchar,tanggal,103) as tgl,tanggal, convert(varchar,tgl_input,108) as jam,nik_user "+
								  "from prb_proyek_app "+
								  "where no_rab='"+kode+"' and tanggal='"+line.tanggal+"' and kode_lokasi='"+this.app._lokasi+"'  "+
								  "order by tanggal desc,convert(varchar,tgl_input,108) desc ";	
												
					var outerHtml2 = "";
					var data2 = this.dbLib.getDataProvider(strSQL2,true);
					if (typeof data2 == "object" && data.rs.rows[0] != undefined){
						var line2;
						for (var x in data2.rs.rows){
							line2 = data2.rs.rows[x];	
							outerHtml2 += "<!-- timeline item -->"+
							"    <li>"+
							"      <i class='fa fa-envelope bg-blue'></i>"+
							"      <div class='timeline-item' style='box-sizing: border-box;border: 1px solid #dedcdc;'>"+
							"        <span class='time'><i class='fa fa-clock-o'></i>"+line2.jam+"</span>"+
							"        <h3 class='timeline-header'>"+line2.no_app+" - ["+line2.nik_user+"]</h3>"+
							"        <div class='timeline-body' style='box-sizing: border-box;'>"+line2.catatan+
							"        </div>"+
							"        <div class='timeline-footer' style='box-sizing: border-box;'>"+
							"        </div>"+
							"      </div>"+
							"    </li>"+
							"    <!-- END timeline item -->";
						}
					}		

					Html +=
					"    <li class='time-label'>"+
					"          <span class='bg-red'>"+line.tgl+"          </span>"+
					"    </li>"+
					"    <!-- /.timeline-label -->"+outerHtml2;
				}

				Html +="<li>"+
									"		<i class='fa fa-clock-o bg-gray'></i>"+
									"</li>"+
									"</ul>"+
							"</div>"+
				"<!-- /.col -->"+
				"</div>";

			}else{
				Html += "Catatan tidak ditemukan";
		  }
	
		this.sgctt.setInnerHTML(Html);
		}catch(e) {alert(e);}
					
	}
});