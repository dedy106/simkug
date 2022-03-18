window.app_saku2_transaksi_gaji_fHitungNonReg = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_gaji_fHitungNonReg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_gaji_fHitungNonReg";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perhitungan Gaji: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Gaji",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:100});		
		this.e_pesan = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"Pesan", maxLength:200});		
		this.l_tgl2 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal Transfer", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,12,100,18],date:new Date().getDateStr()}); 
		this.cb_buat = new saiCBBL(this,{bound:[20,13,205,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:1});	
		this.cb_app = new saiCBBL(this,{bound:[20,14,205,20],caption:"NIK Approval", multiSelection:false, maxLength:10, tag:1});	
		this.cb_pos = new saiCBBL(this,{bound:[20,15,205,20],caption:"No Index", multiSelection:false, maxLength:10, tag:1});		
		
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_buat.setSQL("select nik, nama from hr_karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);	
			this.cb_app.setSQL("select nik, nama from hr_karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);		
			this.cb_pos.setSQL("select no_load, keterangan from hr_gajiload_m where flag_form = 'GAJIPOS' and kode_lokasi='"+this.app._lokasi+"'",["no_load","keterangan"],false,["No Index","Keterangan"],"and","Data Index",true);			
		
			var data = this.dbLib.getDataProvider("select sts_sdm,nama from hr_status_sdm where kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["PROSES",line.sts_sdm,line.nama]);
				}
			} else this.sg.clear(1);	
						
			this.cb_buat.setText(this.app._userLog);
						
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GAJIHUT','GAJIADM','GAJIPPH') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GAJIHUT") this.akunHutang = line.flag;
					if (line.kode_spro == "GAJIADM") this.akunAdm = line.flag;								
					if (line.kode_spro == "GAJIPPH") this.akunTpph = line.flag;								
				}
			}			
			var data = this.dbLib.getDataProvider("select top 1 pesan from hr_gaji_m where kode_lokasi='"+this.app._lokasi+"' order by periode desc",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){	
					this.e_pesan.setText(line.pesan);
				} 
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_gaji_fHitungNonReg.extend(window.childForm);
window.app_saku2_transaksi_gaji_fHitungNonReg.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"hr_gaji_m","no_gaji",this.app._lokasi+"-GJ"+this.e_periode.getText().substr(2,4)+".","000"));
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
									
					sql.add("insert into hr_gaji_m(no_gaji,kode_lokasi,periode,tanggal,keterangan,tgl_transfer,nik_buat,tgl_input,nik_user,no_tak,no_kas,no_pos,nik_app,posted,no_dokumen,modul,pesan) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.dp_d2.getDateString()+"','"+this.cb_buat.getText()+"',getdate(),'"+this.app._userLog+"','-','-','"+this.cb_pos.getText()+"','"+this.cb_buat.getText()+"','F','-','NONREG','"+this.e_pesan.getText()+"')");					
					
					//tunjangan posisi, tarif dari load
					sql.add("update a set a.nilai = round((d.tarif_pos * e.idx/100) * (b.idx_posisi/100) * (b.idx_kinerja/100) * (b.idx_unit/100) * (b.idx_kml/100),0) "+
					        "from hr_gaji_nik a inner join hr_gaji_pos b on a.nik=b.nik and a.kode_param='TPOS' and a.kode_lokasi=b.kode_lokasi "+
						    "                   inner join hr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi and c.flag_aktif='1' "+
						    "                   inner join hr_dplk_fp d on c.kode_grade = d.kode_grade and c.kode_lokasi=d.kode_lokasi "+
							"                   inner join hr_status_sdm e on c.sts_sdm = e.sts_sdm and c.kode_lokasi=e.kode_lokasi "+
						    "where b.no_gaji='"+this.cb_pos.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");

					sql.add("update b set b.tarif = round(d.tarif_pos * e.idx/100,0) "+
					        "from hr_gaji_nik a inner join hr_gaji_pos b on a.nik=b.nik and a.kode_param='TPOS' and a.kode_lokasi=b.kode_lokasi "+
						    "                   inner join hr_karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi and c.flag_aktif='1' "+
						    "                   inner join hr_dplk_fp d on c.kode_grade = d.kode_grade and c.kode_lokasi=d.kode_lokasi "+
							"                   inner join hr_status_sdm e on c.sts_sdm = e.sts_sdm and c.kode_lokasi=e.kode_lokasi "+
						    "where b.no_gaji='"+this.cb_pos.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
							
					var strSQL = "select kode_param from hr_gaji_param where bulan = '"+this.e_periode.getText().substr(4,2)+"' and kode_lokasi='"+this.app._lokasi+"'";					
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;						
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							//untk tunjangan pajak masuk ke akun non reg nya
							sql.add("insert into hr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai,dc,kode_drk) "+
									"select distinct '"+this.e_nb.getText()+"',a.nik,a.kode_param,a.kode_lokasi,x.kode_loker,w.kode_akun,'"+this.e_periode.getText()+"',round(z.rekap,0) as rekap,w.dc,w.kode_drk "+
									"from hr_gaji_nik a "+
									"inner join hr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi and x.flag_aktif='1' "+
									"inner join hr_gaji_param w on a.kode_param=w.kode_param and a.kode_lokasi=w.kode_lokasi "+				
									"inner join ( "+
									"    select a.nik,a.kode_lokasi,sum(a.nilai * ((b.idx_cuti+b.idx_thr+b.idx_pakser+b.idx_didik)/100)) + (0.05 * sum(a.nilai * ((b.idx_cuti+b.idx_thr+b.idx_pakser+b.idx_didik)/100))) as rekap "+
									"    from hr_gaji_nik a inner join hr_gaji_pos b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.no_gaji='"+this.cb_pos.getText()+"' "+
									"    where a.kode_param in ('GDAS','TDAS','TPOS') and a.kode_lokasi='"+this.app._lokasi+"' "+
									"    group by a.nik,a.kode_lokasi) z on a.nik=z.nik and a.kode_lokasi=z.kode_lokasi "+
									"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_param='"+line.kode_param+"' and x.sts_sdm in ("+status+")");									

							//potongan pajak masuk ke akun pot pph
							sql.add("insert into hr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai,dc,kode_drk) "+
									"select distinct '"+this.e_nb.getText()+"',a.nik,a.kode_param,a.kode_lokasi,x.kode_loker,w.kode_akun,'"+this.e_periode.getText()+"',round(z.rekap,0) as rekap,w.dc,w.kode_drk "+
									"from hr_gaji_nik a "+
									"inner join hr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi and x.flag_aktif='1' "+
									"inner join hr_gaji_param w on a.kode_param=w.kode_param and a.kode_lokasi=w.kode_lokasi "+				
									"inner join ( "+
									"    select a.nik,a.kode_lokasi,(0.05 * sum(a.nilai * ((b.idx_cuti+b.idx_thr+b.idx_pakser+b.idx_didik)/100))) as rekap "+
									"    from hr_gaji_nik a inner join hr_gaji_pos b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.no_gaji='"+this.cb_pos.getText()+"' "+
									"    where a.kode_param in ('GDAS','TDAS','TPOS') and a.kode_lokasi='"+this.app._lokasi+"' "+
									"    group by a.nik,a.kode_lokasi) z on a.nik=z.nik and a.kode_lokasi=z.kode_lokasi "+
									"where w.kode_lokasi='"+this.app._lokasi+"' and w.kode_param='PPPH' and x.sts_sdm in ("+status+")");									
							
							//simpan rincian
							sql.add("insert into hr_gaji_tambah(no_gaji,nik,kode_rekap,kode_param,kode_lokasi,periode,nilai,dc) "+
									"select '"+this.e_nb.getText()+"',x.nik,'"+line.kode_param+"',z.kode_param,x.kode_lokasi,'"+this.e_periode.getText()+"',round(z.nilai,0) as nilai,'D' "+
									"from  hr_karyawan x "+
									"inner join hr_gaji_nik z on x.nik=z.nik and x.kode_lokasi=z.kode_lokasi and z.kode_param in ('GDAS','TDAS','TPOS') "+
									"inner join hr_gaji_pos zz on z.nik=zz.nik and z.kode_lokasi=zz.kode_lokasi and zz.no_gaji='"+this.cb_pos.getText()+"' "+
									"where x.kode_lokasi='"+this.app._lokasi+"' and x.flag_aktif='1' ");
							sql.add("insert into hr_gaji_tambah(no_gaji,nik,kode_rekap,kode_param,kode_lokasi,periode,nilai,dc) "+
									"select '"+this.e_nb.getText()+"',a.nik,'"+line.kode_param+"','TPPH',a.kode_lokasi,'"+this.e_periode.getText()+"',round(z.rekap,0) as rekap,'D' "+
									"from hr_gaji_nik a "+
									"inner join hr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi and x.flag_aktif='1' "+									
									"inner join ( "+
									"    select a.nik,a.kode_lokasi,(0.05 * sum(a.nilai * ((b.idx_cuti+b.idx_thr+b.idx_pakser+b.idx_didik)/100))) as rekap "+
									"    from hr_gaji_nik a inner join hr_gaji_pos b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and b.no_gaji='"+this.cb_pos.getText()+"' "+
									"    where a.kode_param in ('GDAS','TDAS','TPOS') and a.kode_lokasi='"+this.app._lokasi+"' "+
									"    group by a.nik,a.kode_lokasi) z on a.nik=z.nik and a.kode_lokasi=z.kode_lokasi "+
									"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_param='"+line.kode_param+"' and x.sts_sdm in ("+status+")");									
							sql.add("insert into hr_gaji_tambah(no_gaji,nik,kode_rekap,kode_param,kode_lokasi,periode,nilai,dc) "+
									"select no_gaji,nik,'"+line.kode_param+"','PPPH',kode_lokasi,periode,nilai,'C' "+
									"from hr_gaji_tambah where no_gaji='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_param='TPPH'");						
						}
					}
					
					sql.add("insert into hr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,nilai,dc,kode_drk) "+
							"select distinct '"+this.e_nb.getText()+"',a.nik,a.kode_param,a.kode_lokasi,x.kode_loker,w.kode_akun,'"+this.e_periode.getText()+"',a.nilai,w.dc,w.kode_drk "+
							"from hr_gaji_nik a "+
							"inner join hr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi and x.flag_aktif='1' "+
							"inner join hr_gaji_param w on a.kode_param=w.kode_param and a.kode_lokasi=w.kode_lokasi "+				
							"where a.kode_lokasi='"+this.app._lokasi+"' and w.jenis='L' and x.sts_sdm in ("+status+")");														
							
					sql.add("insert into hr_gaji_j(no_gaji,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,b.kode_akun,'"+this.e_ket.getText()+"',b.dc,'IDR',1,round(sum(a.nilai),0),round(sum(a.nilai),0),'"+this.app._kodePP+"',b.kode_drk,a.kode_lokasi,'GAJI','BEBAN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate() "+
							"from hr_gaji_d a inner join hr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+							
							"where a.nilai <> 0 and a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"group by b.kode_akun,b.dc,b.kode_drk,a.kode_lokasi");
					sql.add("insert into hr_gaji_j(no_gaji,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,'"+this.akunHutang+"','"+this.e_ket.getText()+"','C','IDR',1,round(sum(case b.dc when 'D' then a.nilai else -a.nilai end),0),round(sum(case b.dc when 'D' then a.nilai else -a.nilai end),0),'"+this.app._kodePP+"','-',a.kode_lokasi,'GAJI','HUTANG','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate() "+
							"from hr_gaji_d a inner join hr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"where a.nilai <> 0 and a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"group by a.kode_lokasi");

					sql.add("update a set a.nilai=0 "+
					        "from hr_gaji_nik a inner join hr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi and b.jenis='L' "+
					        "where a.kode_lokasi ='"+this.app._lokasi+"'");
					
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
		var data = this.dbLib.getDataProvider("select kode_param,nama,flag_rumus,flag_rutin from hr_gaji_param where bulan ='"+this.e_periode.getText().substr(4,2)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];			
				//if (line.flag_rutin == "1") var vStatus = "PROSES"; else var vStatus = "NON";
				this.sg2.appendData(["PROSES",line.kode_param,line.nama,line.flag_rumus]);
			}
		} else this.sg2.clear(1);					
	},	
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"hr_gaji_m","no_gaji",this.app._lokasi+"-GJ"+this.e_periode.getText().substr(2,4)+".","000"));
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



