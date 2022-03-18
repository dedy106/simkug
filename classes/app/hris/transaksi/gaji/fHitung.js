window.app_hris_transaksi_gaji_fHitung = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_gaji_fHitung.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_gaji_fHitung";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perhitungan Gaji: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Gaji",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:100});		
		this.l_tgl2 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal Transfer", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,12,100,18],date:new Date().getDateStr()}); 
		this.cb_buat = new saiCBBL(this,{bound:[20,16,205,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:1});
		//this.bSimulasi = new button(this,{bound:[840,16,80,18],caption:"Simulasi",click:[this,"doHitung"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,340], childPage:["Data Status Karyawan","Detail Parameter"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
		            colTitle:["Status","Kode","Status Karyawan"],
					colWidth:[[2,1,0],[300,100,80]],
					columnReadOnly:[true,[0,1,2],[]],
					buttonStyle:[[0],[bsAuto]],
					picklist:[[0],[new portalui_arrayMap({items:["PROSES","NON"]})]],
					autoAppend:false,defaultRow:1});	
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["Status","Kode","Nama Parameter","Flag Rumus"],
					colWidth:[[3,2,1,0],[80,300,100,80]],
					columnReadOnly:[true,[0,1,2,3],[]],
					buttonStyle:[[0],[bsAuto]],
					picklist:[[0],[new portalui_arrayMap({items:["PROSES","NON"]})]],
					autoAppend:false,defaultRow:1});
		
		this.sg3 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:39,tag:9,
		            colTitle:["NIK","NAMA","STS PJK","STS KAR","JAB","LOKER","HK","UHAR","GDAS","TPOS",
					          "TPRES","TSUS","TRANS","HT","TH","REM","RTPRES","INS","CUTI","BAS",
							  "THR","BONUS","RGDAS","RAPLL","PTRANS","PREM","PDPT","IK","PA","HP",
							  "POT","CLAIN","LMBR","SALDO","JAMSOS","JIWAS","AKDHK","PPH","PERIODE KERJA"],
					colWidth:[[38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],
			                  [100,100,100,100,100,100,100,100,100,  100,100,100,100,100,100,100,100,100,100,  100,100,100,100,100,100,100,100,100,100,  100,100,80,80,80,80,80,80,100,80]],	
					colFormat:[[6,7,8,9, 10,11,12,13,14,15,16,17,18,19, 20,21,22,23,24,25,26,27,28,29, 30,31,32,33,34,35,36,37],
				              [cfNilai,cfNilai,cfNilai,cfNilai, 
							  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai, 
							  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,
							  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					readOnly:true,					
					autoAppend:false,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg3});
					
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
		
			var data = this.dbLib.getDataProvider("select sts_sdm,nama from gr_status_sdm where kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["PROSES",line.sts_sdm,line.nama]);
				}
			} else this.sg.clear(1);	
			
			var data = this.dbLib.getDataProvider("select kode_param,nama,flag_rumus,flag_rutin from gr_gaji_param where kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];			
					if (line.flag_rutin == "1") var vStatus = "PROSES"; else var vStatus = "NON";
					this.sg2.appendData([vStatus,line.kode_param,line.nama,line.flag_rumus]);
				}
			} else this.sg2.clear(1);	
				
			this.cb_buat.setText(this.app._userLog);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_gaji_fHitung.extend(window.childForm);
window.app_hris_transaksi_gaji_fHitung.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_gaji_m","no_gaji",this.app._lokasi+"-GJ"+this.e_periode.getText().substr(2,4)+".","000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var status = ""; 
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i)=="PROSES") {
							status += ",'"+this.sg.cells(1,i)+"'";
						}			
					}
					status = status.substr(1);			
					if (status == "") status = "''";
					
					var kodeparam = ""; 
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES") {
							kodeparam += ",'"+this.sg2.cells(1,i)+"'";
						}			
					}
					kodeparam = kodeparam.substr(1);			
					if (kodeparam == "") kodeparam = "''";
										
					sql.add("insert into gr_gaji_m(no_gaji,kode_lokasi,periode,tanggal,keterangan,tgl_transfer,nik_buat,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.dp_d2.getDateString()+"','"+this.cb_buat.getText()+"',getdate(),'"+this.app._userLog+"')");					
					
					sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
							"select distinct '"+this.e_nb.getText()+"',a.nik,a.kode_param,a.kode_lokasi,x.kode_loker,y.akun_gaji as kode_akun,'"+this.e_periode.getText()+"',a.nilai "+
							"from gr_gaji_nik a "+
							"inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
							"inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+
							"inner join gr_gaji_param w on a.kode_param=w.kode_param and a.kode_lokasi=w.kode_lokasi "+				
							"where w.flag_rumus ='0' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_param in ("+kodeparam+") and x.sts_sdm in ("+status+")");		
							
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="TPRES" && this.sg2.cells(3,i)=="1") {
							sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
										"select '"+this.e_nb.getText()+"',a.nik,'TPRES',a.kode_lokasi,x.kode_loker,y.akun_gaji as kode_akun,'"+this.e_periode.getText()+"', round(i.persen_pres/80*a.tpres,0)-1 as nilai "+
										"from (select nik,kode_lokasi,nilai as tpres from gr_gaji_nik where kode_param = 'TPRES') a "+
										"		inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
										"		inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+					
										"		inner join gr_penilaian_m w on a.nik=w.nik_buat and a.kode_lokasi=w.kode_lokasi and w.periode='"+this.e_periode.getText()+"' "+
										"		inner join gr_jab u on x.kode_jab=u.kode_jab and u.kode_lokasi=x.kode_lokasi "+
										"		inner join gr_skala i on w.kode_kategori=i.kode_kategori and u.jenis=i.jenis and u.kode_lokasi=i.kode_lokasi and w.kode_lokasi=i.kode_lokasi "+
										"where a.kode_lokasi='"+this.app._lokasi+"' and x.flag_gaji='NON' and x.sts_sdm in ("+status+")");		
						}			
						if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="RTPRES" && this.sg2.cells(3,i)=="1") {
							sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
										"select '"+this.e_nb.getText()+"',a.nik,'RTPRES',a.kode_lokasi,x.kode_loker,y.akun_gaji as kode_akun,'"+this.e_periode.getText()+"', 3*(round(i.persen_pres/80*a.tpres,0)-1) as nilai "+
										"from (select nik,kode_lokasi,nilai as tpres from gr_gaji_nik where kode_param = 'TPRES') a "+
										"		inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
										"		inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+					
										"		inner join gr_penilaian_m w on a.nik=w.nik_buat and a.kode_lokasi=w.kode_lokasi and w.periode='"+this.e_periode.getText()+"' "+
										"		inner join gr_jab u on x.kode_jab=u.kode_jab and u.kode_lokasi=x.kode_lokasi "+
										"		inner join gr_skala i on w.kode_kategori=i.kode_kategori and u.jenis=i.jenis and u.kode_lokasi=i.kode_lokasi and w.kode_lokasi=i.kode_lokasi "+
										"where a.kode_lokasi='"+this.app._lokasi+"' and x.flag_gaji='NON' and x.sts_sdm in ("+status+")");
						}
						if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="CUTI" && this.sg2.cells(3,i)=="1") {
							sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
										"select '"+this.e_nb.getText()+"',a.nik,'CUTI',a.kode_lokasi,x.kode_loker,y.akun_gaji as kode_akun,'"+this.e_periode.getText()+"',case when x.flag_versi='1' then a.thp1 else b.thp2 end as nilai "+
										"from  (select nik,kode_lokasi,sum(nilai) as thp1 from gr_gaji_nik  "+
										"	    where kode_param in ('GDAS','TPOS','TPRES','TSUS','TRANS') group by nik,kode_lokasi) a inner join "+
										"	   (select nik,kode_lokasi,sum(nilai) as thp2 from gr_gaji_nik  "+
										"	    where kode_param in ('GDAS','TPOS','TPRES','TRANS') group by nik,kode_lokasi) b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
										"	    inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
										"		inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+
										"where a.kode_lokasi='"+this.app._lokasi+"' and x.flag_gaji='NON' and x.sts_sdm in ("+status+")");
						}
						if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="BAS" && this.sg2.cells(3,i)=="1") {
							sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
										"select '"+this.e_nb.getText()+"',a.nik,'BAS',a.kode_lokasi,x.kode_loker,y.akun_gaji as kode_akun,'"+this.e_periode.getText()+"',case when x.flag_versi='1' then a.thp1 else b.thp2 end as nilai "+
										"from  (select nik,kode_lokasi,sum(nilai) as thp1 from gr_gaji_nik  "+
										"	    where kode_param in ('GDAS','TPOS','TPRES','TSUS','TRANS') group by nik,kode_lokasi) a inner join "+
										"	   (select nik,kode_lokasi,sum(nilai) as thp2 from gr_gaji_nik  "+
										"	    where kode_param in ('GDAS','TPOS','TPRES','TRANS') group by nik,kode_lokasi) b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+							
										"	    inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
										"		inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+
										"where a.kode_lokasi='"+this.app._lokasi+"' and x.flag_gaji='NON' and datediff (yy,x.tgl_masuk,getdate())<>0 and x.sts_sdm in ("+status+")");					
						}			
						if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="INS" && this.sg2.cells(3,i)=="1") {
							sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
										"select '"+this.e_nb.getText()+"',a.nik,'INS',a.kode_lokasi,x.kode_loker,y.akun_gaji as kode_akun,'"+this.e_periode.getText()+"', round(i.persen_ins/100*(case when x.flag_versi='1' then a.thp1 else b.thp2 end),0) as nilai "+
										"from  (select nik,kode_lokasi,sum(nilai) as thp1 from gr_gaji_nik  "+
										"	    where kode_param in ('GDAS','TPOS','TPRES','TSUS','TRANS') group by nik,kode_lokasi) a inner join "+
										"	   (select nik,kode_lokasi,sum(nilai) as thp2 from gr_gaji_nik  "+
										"	    where kode_param in ('GDAS','TPOS','TPRES','TRANS') group by nik,kode_lokasi) b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+							
										"		inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
										"		inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+					
										"		inner join gr_penilaian_m w on a.nik=w.nik_buat and a.kode_lokasi=w.kode_lokasi and w.periode='"+this.e_periode.getText()+"' "+
										"		inner join gr_jab u on x.kode_jab=u.kode_jab and u.kode_lokasi=x.kode_lokasi "+
										"		inner join gr_skala i on w.kode_kategori=i.kode_kategori and u.jenis=i.jenis and u.kode_lokasi=i.kode_lokasi and w.kode_lokasi=i.kode_lokasi "+
										"where a.kode_lokasi='"+this.app._lokasi+"' and x.flag_gaji='NON' and x.sts_sdm in ("+status+")");							
						}
						if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="THR" && this.sg2.cells(3,i)=="1") {
							sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
										"select '"+this.e_nb.getText()+"',a.nik,'THR',a.kode_lokasi,x.kode_loker,y.akun_gaji as kode_akun,'"+this.e_periode.getText()+"',case when x.flag_versi='1' then a.thp1 else b.thp2 end as nilai "+
										"from  (select nik,kode_lokasi,sum(nilai) as thp1 from gr_gaji_nik  "+
										"	    where kode_param in ('GDAS','TPOS','TPRES','TSUS','TRANS') group by nik,kode_lokasi) a inner join "+
										"	   (select nik,kode_lokasi,sum(nilai) as thp2 from gr_gaji_nik  "+
										"	    where kode_param in ('GDAS','TPOS','TPRES','TRANS') group by nik,kode_lokasi) b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
										"	    inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
										"		inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+
										"where a.kode_lokasi='"+this.app._lokasi+"' and x.flag_gaji='NON' and x.sts_sdm in ("+status+")");
						}	
						if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="LMBR" && this.sg2.cells(3,i)=="1") {
							sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
									"select '"+this.e_nb.getText()+"',a.nik,'LMBR',a.kode_lokasi,x.kode_loker,y.kode_akun,'"+this.e_periode.getText()+"', "+
									"isnull(b.nilai_lembur+b.nilai_makan+nilai_trans,0) as nilai_final "+
									"from gr_gaji_nik a "+
									"inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
									"inner join gr_gaji_param y on a.kode_param=y.kode_param and a.kode_lokasi=y.kode_lokasi "+
									"left join gr_gajilembur_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.periode = '"+this.e_periode.getText()+"' "+
									"where a.kode_lokasi='"+this.app._lokasi+"' and x.flag_gaji='NON' and a.kode_param='LMBR'");
						}
						if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="TH" && this.sg2.cells(3,i)=="1") {
							sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
									"select '"+this.e_nb.getText()+"',a.nik,'TH',a.kode_lokasi,x.kode_loker,y.akun_gaji as kode_akun,'"+this.e_periode.getText()+"', (a.uh*b.nilai) as nilai "+
									"from (select nik,kode_lokasi,nilai as uh from gr_gaji_nik where kode_param = 'UHAR') a "+									
									"		inner join gr_gajiload_d b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.periode='"+this.e_periode.getText()+"'"+
									"		inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
									"		inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+
									"		inner join gr_penilaian_m w on a.nik=w.nik_buat and a.kode_lokasi=w.kode_lokasi and w.periode='"+this.e_periode.getText()+"' "+
									"		inner join gr_jab u on x.kode_jab=u.kode_jab and u.kode_lokasi=x.kode_lokasi "+
									"		inner join gr_skala i on w.kode_kategori=i.kode_kategori and u.jenis=i.jenis and u.kode_lokasi=i.kode_lokasi and w.kode_lokasi=i.kode_lokasi "+
									"where a.kode_lokasi='"+this.app._lokasi+"' and x.flag_gaji='SALES' and x.sts_sdm in ("+status+")");
						}
						if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="JAMSOS" && this.sg2.cells(3,i)=="1") {
							sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
									"select '"+this.e_nb.getText()+"',a.nik,'JAMSOS',a.kode_lokasi,x.kode_loker,y.akun_jamsos as kode_akun,'"+this.e_periode.getText()+"',a.jamsos as nilai "+
										"from  "+							
										"	(select a.nik,a.kode_lokasi,case when a.flag_gaji='NON' then case when a.sts_sdm in ('1','2') then 0.0624*(isnull(c.rem,0)-isnull(c.tpres,0)-isnull(c.tsus,0)) else (case when substring(a.sts_pajak,1,1)='K' then 0.1224*(isnull(c.rem,0)-isnull(c.tpres,0)-isnull(c.tsus,0)) else 0.0924*(isnull(c.rem,0)-isnull(c.tpres,0)-isnull(c.tsus,0)) end) end else (case when substring(a.sts_pajak,1,1)='K' then 0.1224*(isnull(c.rem,0)*0.75) else 0.0924*(isnull(c.rem,0)*0.75) end) end as jamsos "+
										"	from gr_karyawan a "+							
										"	inner join (select a.nik,a.kode_lokasi,sum(case a.kode_param when 'GDAS' then a.nilai else 0 end) as gdas,  "+
										"			  sum(case a.kode_param when 'TPOS' then a.nilai else 0 end) as tpos, "+
										"			  sum(case a.kode_param when 'TPRES' then a.nilai else 0 end) as tpres, "+
										"		  	  sum(case a.kode_param when 'TSUS' then a.nilai else 0 end) as tsus, "+
										"		  	  sum(case a.kode_param when 'TRANS' then a.nilai else 0 end) as trans, "+
										"		  	  sum(case a.kode_param when 'HT' then a.nilai else 0 end) as ht, "+
										"		  	  sum(case a.kode_param when 'TH' then a.nilai else 0 end) as th, "+
										"		  	  sum(case when a.kode_param in ('GDAS','TPOS','TPRES','TSUS','TRANS','HT','TH') then a.nilai else 0 end) as rem "+
										"		  	  from gr_gaji_d a group by a.nik,a.kode_lokasi "+
										"		   	  )c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi where a.sts_sdm='1') a "+
										"	 inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
										"    inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+
										"where a.kode_lokasi='"+this.app._lokasi+"'");
						}
						if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="AKDHK" && this.sg2.cells(3,i)=="1") {
							sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
									"select '"+this.e_nb.getText()+"',a.nik,'AKDHK',a.kode_lokasi,x.kode_loker,y.akun_akdhk as kode_akun,'"+this.e_periode.getText()+"',a.akdhk as nilai "+
										"from  "+							
										"	(select a.nik,a.kode_lokasi,case when a.flag_gaji='NON' then 0.0024*(isnull(c.rem,0)-isnull(c.tpres,0)-isnull(c.tsus,0)) else 0.0024*(isnull(c.rem,0)*0.75) end as akdhk "+
										"	from gr_karyawan a "+		
										"	inner join gr_loker d on a.kode_loker=d.kode_loker and a.kode_lokasi=d.kode_lokasi "+							
										"	inner join (select a.nik,a.kode_lokasi,sum(case a.kode_param when 'GDAS' then a.nilai else 0 end) as gdas,  "+
										"		  sum(case a.kode_param when 'TPOS' then a.nilai else 0 end) as tpos, "+
										"		  sum(case a.kode_param when 'TPRES' then a.nilai else 0 end) as tpres, "+
										"		  sum(case a.kode_param when 'TSUS' then a.nilai else 0 end) as tsus, "+
										"		  sum(case a.kode_param when 'TRANS' then a.nilai else 0 end) as trans, "+
										"		  sum(case a.kode_param when 'HT' then a.nilai else 0 end) as ht, "+
										"		  sum(case a.kode_param when 'TH' then a.nilai else 0 end) as th, "+
										"		  sum(case when a.kode_param in ('GDAS','TPOS','TPRES','TSUS','TRANS','HT','TH') then a.nilai else 0 end) as rem "+
										"		  from gr_gaji_d a group by a.nik,a.kode_lokasi "+
										"		  )c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi and (a.sts_sdm in ('4','9') or (a.sts_sdm='1' and d.status='JKT'))) a "+							
										"	 inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
										"    inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+
										"where a.kode_lokasi='"+this.app._lokasi+"'");
						}
						if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="JIWAS" && this.sg2.cells(3,i)=="1") {
							sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
									"select '"+this.e_nb.getText()+"',a.nik,'JIWAS',a.kode_lokasi,x.kode_loker,y.akun_jiwas as kode_akun,'"+this.e_periode.getText()+"',a.jiwas as nilai "+
										"from  "+							
										"	(select a.nik,a.kode_lokasi,0.03*(isnull(c.rem,0)-isnull(c.tsus,0)) as jiwas "+
										"	 from gr_karyawan a "+							
										"	 inner join (select a.nik,a.kode_lokasi,sum(case a.kode_param when 'GDAS' then a.nilai else 0 end) as gdas,  "+
										"		  sum(case a.kode_param when 'TPOS' then a.nilai else 0 end) as tpos, "+
										"		  sum(case a.kode_param when 'TPRES' then a.nilai else 0 end) as tpres, "+
										"		  sum(case a.kode_param when 'TSUS' then a.nilai else 0 end) as tsus, "+
										"		  sum(case a.kode_param when 'TRANS' then a.nilai else 0 end) as trans, "+
										"		  sum(case when a.kode_param in ('GDAS','TPOS','TPRES','TSUS','TRANS') then a.nilai else 0 end) as rem "+
										"		  from gr_gaji_d a group by a.nik,a.kode_lokasi "+
										"		  )c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi and a.sts_sdm='1' ) a "+
										"	 inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
										"    inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+
										"where a.kode_lokasi='"+this.app._lokasi+"'");
						}
						if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="TPPH" && this.sg2.cells(3,i)=="1") {
							sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
										"select '"+this.e_nb.getText()+"',a.nik,'TPPH',a.kode_lokasi,x.kode_loker,y.akun_pph as kode_akun,'"+this.e_periode.getText()+"',a.pph21 as nilai "+
										"from  "+							
										"	(select x.nik,x.kode_lokasi,case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end as pph21 "+
										"	 from (select a.nik,a.kode_lokasi,c.sts_pajak, "+ 
										"	 	   sum(case b.dc when 'D' then a.nilai else -a.nilai end) as total_bln, "+
										"		   sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12 as total, "+
										"		   d.nilai as ptkp,d.biaya_jab,d.jab_max, "+
										"		   case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
										"		   else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as b_jab, "+
										"		  (sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12) - d.nilai - "+
										"		   case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
										"		   else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as pkp "+
										"	  from gr_gaji_d a  "+
										"	  inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
										"	  inner join gr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
										"	  inner join gr_status_pajak d on c.sts_pajak=d.sts_pajak and c.kode_lokasi=d.kode_lokasi and b.jenis='T' "+ //T = tunjangan
										"     where b.jenis ='T' and b.dc ='D' "+
										"	  group by a.nik,a.kode_lokasi,d.nilai,c.sts_pajak,d.biaya_jab,d.jab_max "+
										"	 ) x left join gr_pph21 y on x.pkp between y.bawah and y.atas and x.kode_lokasi=y.kode_lokasi "+ 
										"	 where case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end > 0 ) a "+							
										"	 inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
										"    inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+
										"where a.kode_lokasi='"+this.app._lokasi+"'");
							sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
									"select no_gaji,nik,'PPPH',kode_lokasi,kode_loker,kode_akun,periode,nilai "+
									"from gr_gaji_d where no_gaji='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_param='TPPH'");
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
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
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
		this.e_nb.setText("");
	},
	doHitung:function(sender){
		var status = ""; 
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(0,i)=="PROSES") {
				status += ",'"+this.sg.cells(1,i)+"'";
			}			
		}
		status = status.substr(1);			
		if (status == "") status = "''";
		
		var kodeparam = ""; 
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES") {
				kodeparam += ",'"+this.sg2.cells(1,i)+"'";
			}			
		}
		kodeparam = kodeparam.substr(1);			
		if (kodeparam == "") kodeparam = "''";
		
		uses("server_util_arrayList");
		var sql = new server_util_arrayList();
		sql.add("delete from gr_gaji_d");		
		sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
				"select distinct '"+this.e_nb.getText()+"',a.nik,a.kode_param,a.kode_lokasi,x.kode_loker,y.akun_gaji as kode_akun,'"+this.e_periode.getText()+"',a.nilai "+
				"from gr_gaji_nik a "+
				"inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
				"inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+
				"inner join gr_gaji_param w on a.kode_param=w.kode_param and a.kode_lokasi=w.kode_lokasi "+				
				"where w.flag_rumus ='0' and a.kode_lokasi='"+this.app._lokasi+"' and x.flag_gaji='NON' and a.kode_param in ("+kodeparam+") and x.sts_sdm in ("+status+")");		
				
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="TPRES") {
				sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
							"select '"+this.e_nb.getText()+"',a.nik,'TPRES',a.kode_lokasi,x.kode_loker,y.akun_gaji as kode_akun,'"+this.e_periode.getText()+"', round(i.persen_pres/80*a.tpres,0)-1 as nilai "+
							"from (select nik,kode_lokasi,nilai as tpres from gr_gaji_nik where kode_param = 'TPRES') a "+
							"		inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
							"		inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+					
							"		inner join gr_penilaian_m w on a.nik=w.nik_buat and a.kode_lokasi=w.kode_lokasi and w.periode='"+this.e_periode.getText()+"' "+
							"		inner join gr_jab u on x.kode_jab=u.kode_jab and u.kode_lokasi=x.kode_lokasi "+
							"		inner join gr_skala i on w.kode_kategori=i.kode_kategori and u.jenis=i.jenis and u.kode_lokasi=i.kode_lokasi and w.kode_lokasi=i.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and x.flag_gaji='NON' and x.sts_sdm in ("+status+")");		
			}			
			if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="RTPRES") {
				sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
							"select '"+this.e_nb.getText()+"',a.nik,'RTPRES',a.kode_lokasi,x.kode_loker,y.akun_gaji as kode_akun,'"+this.e_periode.getText()+"', 3*(round(i.persen_pres/80*a.tpres,0)-1) as nilai "+
							"from (select nik,kode_lokasi,nilai as tpres from gr_gaji_nik where kode_param = 'TPRES') a "+
							"		inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
							"		inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+					
							"		inner join gr_penilaian_m w on a.nik=w.nik_buat and a.kode_lokasi=w.kode_lokasi and w.periode='"+this.e_periode.getText()+"' "+
							"		inner join gr_jab u on x.kode_jab=u.kode_jab and u.kode_lokasi=x.kode_lokasi "+
							"		inner join gr_skala i on w.kode_kategori=i.kode_kategori and u.jenis=i.jenis and u.kode_lokasi=i.kode_lokasi and w.kode_lokasi=i.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and x.flag_gaji='NON' and x.sts_sdm in ("+status+")");
			}
			if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="CUTI") {
				sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
							"select '"+this.e_nb.getText()+"',a.nik,'CUTI',a.kode_lokasi,x.kode_loker,y.akun_gaji as kode_akun,'"+this.e_periode.getText()+"',case when x.flag_versi='1' then a.thp1 else b.thp2 end as nilai "+
							"from  (select nik,kode_lokasi,sum(nilai) as thp1 from gr_gaji_nik  "+
							"	    where kode_param in ('GDAS','TPOS','TPRES','TSUS','TRANS') group by nik,kode_lokasi) a inner join "+
							"	   (select nik,kode_lokasi,sum(nilai) as thp2 from gr_gaji_nik  "+
							"	    where kode_param in ('GDAS','TPOS','TPRES','TRANS') group by nik,kode_lokasi) b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"	    inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
							"		inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and x.flag_gaji='NON' and x.sts_sdm in ("+status+")");
			}
			if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="BAS") {
				sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
							"select '"+this.e_nb.getText()+"',a.nik,'BAS',a.kode_lokasi,x.kode_loker,y.akun_gaji as kode_akun,'"+this.e_periode.getText()+"',case when x.flag_versi='1' then a.thp1 else b.thp2 end as nilai "+
							"from  (select nik,kode_lokasi,sum(nilai) as thp1 from gr_gaji_nik  "+
							"	    where kode_param in ('GDAS','TPOS','TPRES','TSUS','TRANS') group by nik,kode_lokasi) a inner join "+
							"	   (select nik,kode_lokasi,sum(nilai) as thp2 from gr_gaji_nik  "+
							"	    where kode_param in ('GDAS','TPOS','TPRES','TRANS') group by nik,kode_lokasi) b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+							
							"	    inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
							"		inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and x.flag_gaji='NON' and x.sts_sdm in ("+status+")");					
			}			
			if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="INS") {
				sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
							"select '"+this.e_nb.getText()+"',a.nik,'INS',a.kode_lokasi,x.kode_loker,y.akun_gaji as kode_akun,'"+this.e_periode.getText()+"', round(i.persen_ins/100*(case when x.flag_versi='1' then a.thp1 else b.thp2 end),0) as nilai "+
							"from  (select nik,kode_lokasi,sum(nilai) as thp1 from gr_gaji_nik  "+
							"	    where kode_param in ('GDAS','TPOS','TPRES','TSUS','TRANS') group by nik,kode_lokasi) a inner join "+
							"	   (select nik,kode_lokasi,sum(nilai) as thp2 from gr_gaji_nik  "+
							"	    where kode_param in ('GDAS','TPOS','TPRES','TRANS') group by nik,kode_lokasi) b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+							
							"		inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
							"		inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+					
							"		inner join gr_penilaian_m w on a.nik=w.nik_buat and a.kode_lokasi=w.kode_lokasi and w.periode='"+this.e_periode.getText()+"' "+
							"		inner join gr_jab u on x.kode_jab=u.kode_jab and u.kode_lokasi=x.kode_lokasi "+
							"		inner join gr_skala i on w.kode_kategori=i.kode_kategori and u.jenis=i.jenis and u.kode_lokasi=i.kode_lokasi and w.kode_lokasi=i.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and x.flag_gaji='NON' and x.sts_sdm in ("+status+")");							
			}
			if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="THR") {
				sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
							"select '"+this.e_nb.getText()+"',a.nik,'THR',a.kode_lokasi,x.kode_loker,y.akun_gaji as kode_akun,'"+this.e_periode.getText()+"',case when x.flag_versi='1' then a.thp1 else b.thp2 end as nilai "+
							"from  (select nik,kode_lokasi,sum(nilai) as thp1 from gr_gaji_nik  "+
							"	    where kode_param in ('GDAS','TPOS','TPRES','TSUS','TRANS') group by nik,kode_lokasi) a inner join "+
							"	   (select nik,kode_lokasi,sum(nilai) as thp2 from gr_gaji_nik  "+
							"	    where kode_param in ('GDAS','TPOS','TPRES','TRANS') group by nik,kode_lokasi) b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"	    inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
							"		inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and x.flag_gaji='NON' and x.sts_sdm in ("+status+")");
			}			
			if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="JAMSOS") {
				sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
						"select '"+this.e_nb.getText()+"',a.nik,'JAMSOS',a.kode_lokasi,x.kode_loker,y.akun_jamsos as kode_akun,'"+this.e_periode.getText()+"',a.jamsos as nilai "+
							"from  "+							
							"	(select a.nik,a.kode_lokasi,case when a.flag_gaji='NON' then case when a.sts_sdm in ('1','2') then 0.0624*(isnull(c.rem,0)-isnull(c.tpres,0)-isnull(c.tsus,0)) else (case when substring(a.sts_pajak,1,1)='K' then 0.1224*(isnull(c.rem,0)-isnull(c.tpres,0)-isnull(c.tsus,0)) else 0.0924*(isnull(c.rem,0)-isnull(c.tpres,0)-isnull(c.tsus,0)) end) end else (case when substring(a.sts_pajak,1,1)='K' then 0.1224*(isnull(c.rem,0)*0.75) else 0.0924*(isnull(c.rem,0)*0.75) end) end as jamsos "+
							"	from gr_karyawan a "+							
							"	inner join (select a.nik,a.kode_lokasi,sum(case a.kode_param when 'GDAS' then a.nilai else 0 end) as gdas,  "+
							"			  sum(case a.kode_param when 'TPOS' then a.nilai else 0 end) as tpos, "+
							"			  sum(case a.kode_param when 'TPRES' then a.nilai else 0 end) as tpres, "+
							"		  	  sum(case a.kode_param when 'TSUS' then a.nilai else 0 end) as tsus, "+
							"		  	  sum(case a.kode_param when 'TRANS' then a.nilai else 0 end) as trans, "+
							"		  	  sum(case a.kode_param when 'HT' then a.nilai else 0 end) as ht, "+
							"		  	  sum(case a.kode_param when 'TH' then a.nilai else 0 end) as th, "+
							"		  	  sum(case when a.kode_param in ('GDAS','TPOS','TPRES','TSUS','TRANS','HT','TH') then a.nilai else 0 end) as rem "+
							"		  	  from gr_gaji_d a group by a.nik,a.kode_lokasi "+
							"		   	  )c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi where a.sts_sdm='1') a "+
							"	 inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
							"    inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"'");
			}
			if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="AKDHK") {
				sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
						"select '"+this.e_nb.getText()+"',a.nik,'AKDHK',a.kode_lokasi,x.kode_loker,y.akun_akdhk as kode_akun,'"+this.e_periode.getText()+"',a.akdhk as nilai "+
							"from  "+							
							"	(select a.nik,a.kode_lokasi,case when a.flag_gaji='NON' then 0.0024*(isnull(c.rem,0)-isnull(c.tpres,0)-isnull(c.tsus,0)) else 0.0024*(isnull(c.rem,0)*0.75) end as akdhk "+
							"	from gr_karyawan a "+		
						    "	inner join gr_loker d on a.kode_loker=d.kode_loker and a.kode_lokasi=d.kode_lokasi "+							
							"	inner join (select a.nik,a.kode_lokasi,sum(case a.kode_param when 'GDAS' then a.nilai else 0 end) as gdas,  "+
							"		  sum(case a.kode_param when 'TPOS' then a.nilai else 0 end) as tpos, "+
							"		  sum(case a.kode_param when 'TPRES' then a.nilai else 0 end) as tpres, "+
							"		  sum(case a.kode_param when 'TSUS' then a.nilai else 0 end) as tsus, "+
							"		  sum(case a.kode_param when 'TRANS' then a.nilai else 0 end) as trans, "+
							"		  sum(case a.kode_param when 'HT' then a.nilai else 0 end) as ht, "+
							"		  sum(case a.kode_param when 'TH' then a.nilai else 0 end) as th, "+
							"		  sum(case when a.kode_param in ('GDAS','TPOS','TPRES','TSUS','TRANS','HT','TH') then a.nilai else 0 end) as rem "+
							"		  from gr_gaji_d a group by a.nik,a.kode_lokasi "+
							"		  )c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi and (a.sts_sdm in ('4','9') or (a.sts_sdm='1' and d.status='JKT'))) a "+							
							"	 inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
							"    inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"'");
			}
			if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="JIWAS") {
				sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
						"select '"+this.e_nb.getText()+"',a.nik,'JIWAS',a.kode_lokasi,x.kode_loker,y.akun_jiwas as kode_akun,'"+this.e_periode.getText()+"',a.jiwas as nilai "+
							"from  "+							
							"	(select a.nik,a.kode_lokasi,0.03*(isnull(c.rem,0)-isnull(c.tsus,0)) as jiwas "+
							"	 from gr_karyawan a "+							
							"	 inner join (select a.nik,a.kode_lokasi,sum(case a.kode_param when 'GDAS' then a.nilai else 0 end) as gdas,  "+
							"		  sum(case a.kode_param when 'TPOS' then a.nilai else 0 end) as tpos, "+
							"		  sum(case a.kode_param when 'TPRES' then a.nilai else 0 end) as tpres, "+
							"		  sum(case a.kode_param when 'TSUS' then a.nilai else 0 end) as tsus, "+
							"		  sum(case a.kode_param when 'TRANS' then a.nilai else 0 end) as trans, "+
							"		  sum(case when a.kode_param in ('GDAS','TPOS','TPRES','TSUS','TRANS') then a.nilai else 0 end) as rem "+
							"		  from gr_gaji_d a group by a.nik,a.kode_lokasi "+
							"		  )c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi and a.sts_sdm='1' ) a "+
							"	 inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
							"    inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"'");
			}
			if (this.sg2.rowValid(i) && this.sg2.cells(0,i)=="PROSES" && this.sg2.cells(1,i)=="TPPH") {
				sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
							"select '"+this.e_nb.getText()+"',a.nik,'TPPH',a.kode_lokasi,x.kode_loker,y.akun_pph as kode_akun,'"+this.e_periode.getText()+"',a.pph21 as nilai "+
							"from  "+							
							"	(select x.nik,x.kode_lokasi,case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end as pph21 "+
							"	 from (select a.nik,a.kode_lokasi,c.sts_pajak, "+ 
							"	 	   sum(case b.dc when 'D' then a.nilai else -a.nilai end) as total_bln, "+
							"		   sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12 as total, "+
							"		   d.nilai as ptkp,d.biaya_jab,d.jab_max, "+
							"		   case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		   else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as b_jab, "+
							"		  (sum(case b.dc when 'D' then a.nilai else -a.nilai end) * 12) - d.nilai - "+
							"		   case when round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) > d.jab_max then d.jab_max "+
							"		   else round(sum(case b.dc when 'D' then a.nilai else -a.nilai end)* 12 * d.biaya_jab/100,0) end as pkp "+
							"	  from gr_gaji_d a  "+
							"	  inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"	  inner join gr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi "+
							"	  inner join gr_status_pajak d on c.sts_pajak=d.sts_pajak and c.kode_lokasi=d.kode_lokasi and b.jenis='T' "+ //T = tunjangan
							"	  group by a.nik,a.kode_lokasi,d.nilai,c.sts_pajak,d.biaya_jab,d.jab_max "+
							"	 ) x left join gr_pph21 y on x.pkp between y.bawah and y.atas and x.kode_lokasi=y.kode_lokasi "+ 
							"	 where case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end > 0 ) a "+							
							"	 inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
							"    inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"'");
				sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai) "+
						"select no_gaji,nik,'PPPH',kode_lokasi,kode_loker,kode_akun,periode,nilai "+
						"from gr_gaji_d where no_gaji='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_param='TPPH'");
			}		
			
		}		
		this.dbLib.execArraySQL(sql);
		
		//TAMPIL-----------------------------
		/*
		this.sg3.clear(1);
		var strSQL = "select * from gr_gaji_tmp order by a.nik";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg3.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg3.appendData([line.nik,line.nama,line.pajak,line.status,line.jab,line.loker,floatToNilai(line.uh),floatToNilai(line.uhar),floatToNilai(line.gadas),floatToNilai(line.tpos),
					          floatToNilai(line.tpres),floatToNilai(line.tsus),floatToNilai(line.trans),floatToNilai(line.ht),floatToNilai(line.th),floatToNilai(line.rem),floatToNilai(line.rtpres),floatToNilai(line.ins),floatToNilai(line.cuti),floatToNilai(line.bas),
							  floatToNilai(line.thr),floatToNilai(line.bonus),floatToNilai(line.rgdas),floatToNilai(line.rapll),floatToNilai(line.ptrans),floatToNilai(line.prem),floatToNilai(line.pdpt),floatToNilai(line.ik),floatToNilai(line.pa),floatToNilai(line.hp),
							  floatToNilai(line.pot),floatToNilai(line.clain),floatToNilai(line.lmbr),floatToNilai(line.saldo),floatToNilai(line.jamsos),floatToNilai(line.jiwas),floatToNilai(line.akdhk),floatToNilai(line.pph),line.periode_kerja]);
			}
		} else this.sg3.clear(1);		
		*/
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_gaji_m","no_gaji",this.app._lokasi+"-GJ"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();
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



