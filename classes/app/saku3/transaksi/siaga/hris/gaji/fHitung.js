window.app_saku3_transaksi_siaga_hris_gaji_fHitung = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_gaji_fHitung.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_gaji_fHitung";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perhitungan Gaji", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Gaji",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,510,20],caption:"Keterangan", maxLength:100});		
		this.l_tgl2 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal Transfer", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,12,98,18],date:new Date().getDateStr()}); 
		this.cb_buat = new saiCBBL(this,{bound:[20,16,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,340], childPage:["Data Status SDM","Detail Parameter","Hapus Transaksi"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-10],colCount:3,tag:9,
		            colTitle:["Status","Kode","Status SDM"],
					colWidth:[[2,1,0],[300,100,80]],
					columnReadOnly:[true,[0,1,2],[]],
					buttonStyle:[[0],[bsAuto]],
					picklist:[[0],[new portalui_arrayMap({items:["PROSES","NON"]})]],
					dblClick:[this,"doDoubleClick"],
					autoAppend:false,defaultRow:1});	
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-10],colCount:3,tag:9,
		            colTitle:["Status","Kode","Nama Parameter"],
					colWidth:[[2,1,0],[300,100,80]],
					columnReadOnly:[true,[0,1,2],[]],
					buttonStyle:[[0],[bsAuto]],
					picklist:[[0],[new portalui_arrayMap({items:["PROSES","NON"]})]],
					dblClick:[this,"doDoubleClick"],
					autoAppend:false,defaultRow:1});
		
		this.cb_bukti = new saiCBBL(this.pc1.childPage[2],{bound:[20,11,220,20],caption:"No Gaji", multiSelection:false, maxLength:10, tag:9});
		this.bDelete = new button(this.pc1.childPage[2],{bound:[120,14,80,18],caption:"Hapus Data",click:[this,"doDelete"]});			

		this.rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);	

		setTipeButton(tbSimpan);	
		this.stsSimpan = 1;			
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();		
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);	
						
			var data = this.dbLib.getDataProvider("select sts_sdm,nama from gr_status_sdm where kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["NON",line.sts_sdm,line.nama]);
				}
			} else this.sg.clear(1);	
			
			var data = this.dbLib.getDataProvider("select kode_param,nama,flag_rutin from gr_gaji_param "+
						"where kode_param not in ('TPPH','PPPH') and kode_lokasi='"+this.app._lokasi+"' order by no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];			
					//if (line.flag_rutin == "1") var vStatus = "PROSES"; else var vStatus = "NON";

					var vStatus = "PROSES";
					this.sg2.appendData([vStatus,line.kode_param,line.nama]);
				}
			} else this.sg2.clear(1);	
				
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_buat.setText(this.app._userLog);

			var strSQL = "select value1,value2 from spro where kode_spro='TGLLBR' and kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line3 = data.rs.rows[0];							
				if (line3 != undefined){																			
					this.tglAwal = line3.value1;	
					this.tglAkhir = line3.value2;	
				}
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_gaji_fHitung.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_gaji_fHitung.implement({
	doDoubleClick: function(sender,col,row) {
		if (sender == this.sg) {
			if (col == 0 ) {
				if (sender.cells(0,row) == "NON") sender.cells(0,row,"PROSES"); 
				else sender.cells(0,row,"NON"); 
			}
		}
		if (sender == this.sg2) {
			if (col == 0 ) {
				if (sender.cells(0,row) == "NON") sender.cells(0,row,"PROSES"); 
				else sender.cells(0,row,"NON"); 
			}
		}
	},
	doDelete: function(sender){		
		uses("server_util_arrayList");
		var sql = new server_util_arrayList();
		this.e_nb.setText(this.cb_bukti.getText());
		sql.add("delete from gr_gaji_m where no_gaji='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
		sql.add("delete from gr_gaji_d where no_gaji='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
		sql.add("update gr_gajilembur_d set no_gaji='-' where no_gaji='"+this.cb_bukti.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");		
		this.dbLib.execArraySQL(sql);				
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
					//jenis gaji bulanan ambil dr yg fixed, yg harian tarif dlm hari dikalikan dgn jumlah absensi(sesuai rumusan)		
									
					if (this.stsSimpan == 1) this.doClick(this.i_gen);	
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
					
					sql.add("insert into gr_gaji_m(no_gaji,kode_lokasi,periode,tanggal,keterangan,tgl_transfer,nik_buat,tgl_input,nik_user,no_pb) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.dp_d2.getDateString()+"','"+this.cb_buat.getText()+"',getdate(),'"+this.app._userLog+"','-')");					
					
					sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,kode_so,nilai) "+
							"select distinct '"+this.e_nb.getText()+"',a.nik,a.kode_param,a.kode_lokasi,x.kode_loker,y.akun_gaji as kode_akun,'"+this.e_periode.getText()+"',x.kode_so,a.nilai "+
							"from gr_gaji_nik a "+
							"inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
							"inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+	
							"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_param in ("+kodeparam+") and x.sts_sdm in ("+status+") ");		
						
					//hitung honor tetap utk yg gaji harian 
					//('GAPOK','KONJ','TGRD','TUJAB') == flag_rutin => 1
					sql.add("update a set a.nilai=z.rem - (21 * c.tarif_uhar) "+
							"from gr_gaji_d a "+
							"inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"inner join gr_lokkantor c on b.lok_kantor=c.kode_lokkantor and c.kode_lokasi=b.kode_lokasi "+ 	
							"inner join ("+
							"			select a.nik,sum(a.nilai) as rem "+
							"			from gr_gaji_nik a "+
							"			inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"			where b.flag_rutin ='1' and b.kode_lokasi='"+this.app._lokasi+"' "+
							"			group by nik "+
							"			) z on a.nik=z.nik  "+	
							"where a.no_gaji='"+this.e_nb.getText()+"' and b.flag_gaji ='HARIAN' and b.kode_lokasi='"+this.app._lokasi+"' "+
							"and a.kode_param='HONTP'");

					//hitung tunjangan uang harian utk yg gaji harian	
					sql.add("update a set a.nilai=z.jml_hari * c.tarif_uhar "+
							"from gr_gaji_d a "+
							"inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"inner join gr_lokkantor c on b.lok_kantor=c.kode_lokkantor and c.kode_lokasi=b.kode_lokasi "+	
							"left join (  "+
							"			select nik,sum(nilai) as jml_hari from gr_gajiload_d "+
							"			where kode_lokasi='"+this.app._lokasi+"' and periode='"+this.e_periode.getText()+"' and flag_form='HARI' group by nik "+							
							" 			) z on a.nik=z.nik "+						
							"where a.no_gaji='"+this.e_nb.getText()+"' and b.flag_gaji ='HARIAN' and b.kode_lokasi='"+this.app._lokasi+"' "+
							"and a.kode_param='TUHAR'");
					
					//update gaji dari parameter variabel		
					sql.add("update a set a.nilai=b.var_gaji "+
							"from gr_gaji_d a "+
							"inner join "+
							"	(select nik,kode_param,periode,sum(case dc when 'D' then nilai else -nilai end) as var_gaji "+
							"	from gr_gajiload_d "+
							"	where kode_lokasi='"+this.app._lokasi+"'  and periode='"+this.e_periode.getText()+"' and flag_form='GAJIVAR' "+
							"	group by nik,kode_param,periode "+
							"	) b on a.nik=b.nik and a.kode_param=b.kode_param and a.periode=b.periode "+
							"where a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					
					//rapel ---> RPL = dari tabel gr_gaji_rapel
					sql.add("update a set a.nilai=b.rapel "+
							"from gr_gaji_d a "+
							"inner join "+
							"	( "+
							"	select nik,rem_baru-rem_lama as rapel "+
							"	from gr_gaji_rapel where '"+this.e_periode.getText()+"' between per_awal and per_akhir and kode_lokasi='"+this.app._lokasi+"' "+							
							"	) b on a.nik=b.nik "+	
							"where a.kode_param='RPL' and a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");
					
					//modul lembur ---> 'LBR' = load dari modul lembur
					var periodeBefore = getPrevPeriode(this.e_periode.getText());
					var tglAwal = periodeBefore.substr(0,4)+"-"+periodeBefore.substr(4,2)+"-"+this.tglAwal;
					var tglAkhir = this.e_periode.getText().substr(0,4)+"-"+this.e_periode.getText().substr(4,2)+"-"+this.tglAkhir;
					sql.add("update a set a.nilai=b.lembur "+
							"from gr_gaji_d a "+
							"inner join "+
							"	( "+
							"	select nik,sum(nilai_lembur+nilai_makan+nilai_trans) as lembur "+
							"	from gr_gajilembur_d "+
							"	where no_gaji='-' and kode_lokasi = '"+this.app._lokasi+"' and tgl_lembur between '"+tglAwal+"' and '"+tglAkhir+"' "+
							"	group by nik "+		
							"	) b on a.nik=b.nik  "+	
							"where a.kode_param='LBR' and a.no_gaji='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");

					sql.add("update gr_gajilembur_d set no_gaji='"+this.e_nb.getText()+"' "+
							"where no_gaji='-' and kode_lokasi = '"+this.app._lokasi+"' and tgl_lembur between '"+tglAwal+"' and '"+tglAkhir+"'");		

					//hitung pajak [langsung potongan tanpa tunjangan]	
					//untuk yg harian,total gaji bulanan kurangi dengan remunerasi 
					//krn total gaji ada di param honor tetap									 
					sql.add("insert into gr_gaji_d(no_gaji,nik,kode_param,kode_lokasi,kode_loker,kode_akun,periode,kode_so,nilai) "+
							"select '"+this.e_nb.getText()+"',a.nik,'PPPH',a.kode_lokasi,x.kode_loker,y.akun_pph as kode_akun,'"+this.e_periode.getText()+"',x.kode_so,-a.pph21 as nilai "+
							"from  "+	

							"("+							
							"	select x.nik,x.kode_lokasi "+
							"	,case when y.persen is null then 0 else round((y.nilai_seb+(( (round(x.pkp/1000,0,1) * 1000) - y.kurang_seb) * y.persen/100)) / 12,0) end as pph21 "+

							"	from "+
							"	(	"+											
							"	select a.nik,b.sts_pajak,a.kode_lokasi "+
							"	,case when b.flag_gaji = 'HARIAN' then isnull(f.rem_harian,0) else 0 end as rem_harian "+

							"	,(sum(a.nilai) - (case when b.flag_gaji = 'HARIAN' then isnull(f.rem_harian,0) else 0 end)) as total_bulan "+
							"	,(sum(a.nilai) - (case when b.flag_gaji = 'HARIAN' then isnull(f.rem_harian,0) else 0 end)) * (g.pengali) as total_setahun "+
							"	,c.nilai as ptkp "+
							"	,c.biaya_jab "+
							"	,c.jab_max "+
							"	,isnull(e.nilai_tambah,0) as nilai_tambah "+

							"	,round(  (((sum(a.nilai) - (case when b.flag_gaji = 'HARIAN' then isnull(f.rem_harian,0) else 0 end))  *  "+
							"	(g.pengali)) + isnull(e.nilai_tambah,0))   *  "+
							"	c.biaya_jab / 100,0) as hitung_jab "+
								
							"	,case when (round(  (((sum(a.nilai) - (case when b.flag_gaji = 'HARIAN' then isnull(f.rem_harian,0) else 0 end)) *  "+
							"	(g.pengali)) + isnull(e.nilai_tambah,0))   *  "+
							"	c.biaya_jab / 100,0)) > c.jab_max  "+
							"	then c.jab_max "+
							"	else  "+
							"	round(  (((sum(a.nilai) - (case when b.flag_gaji = 'HARIAN' then isnull(f.rem_harian,0) else 0 end))   *  "+
							"	(g.pengali)) + isnull(e.nilai_tambah,0))   *  "+
							"	c.biaya_jab / 100,0) "+
							"	end as nilai_jab "+
								
							"	,((sum(a.nilai) - (case when b.flag_gaji = 'HARIAN' then isnull(f.rem_harian,0) else 0 end)) * (g.pengali))  "+
							"	+ isnull(e.nilai_tambah,0)  "+
							"	- c.nilai "+
							"	- (case when (round(   (((sum(a.nilai) - (case when b.flag_gaji = 'HARIAN' then isnull(f.rem_harian,0) else 0 end))   *  "+
							"	(g.pengali)) + isnull(e.nilai_tambah,0)) *  "+
							"	c.biaya_jab / 100,0)) > c.jab_max  "+
							"	then c.jab_max "+
							"	else  "+
							"	round(  (((sum(a.nilai) - (case when b.flag_gaji = 'HARIAN' then isnull(f.rem_harian,0) else 0 end))   *  "+
							"	(g.pengali)) + isnull(e.nilai_tambah,0)) *  "+
							"	c.biaya_jab / 100,0) "+
							"	end) as pkp "+
																				
							"	from gr_gaji_d a  "+
							"		inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"		inner join gr_status_pajak c on b.sts_pajak=c.sts_pajak and b.kode_lokasi=c.kode_lokasi "+
							"		inner join gr_gaji_param d on a.kode_param=d.kode_param and a.kode_lokasi=d.kode_lokasi "+
							"		inner join gr_status_sdm g on b.sts_sdm=g.sts_sdm and b.kode_lokasi=g.kode_lokasi"+

							"		left join ( "+										
							"			select a.nik,sum(a.nilai) as nilai_tambah "+
							"			from gr_gaji_d a  "+
							"			inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi and b.dc = 'D' "+
							"			where a.kode_lokasi='"+this.app._lokasi+"' and b.flag_pajak = '2'   "+
							"			group by a.nik "+										
							"		) e on a.nik=e.nik "+

							//scrip tabel F --> untuk ngurangi total gaji bagi yg statusnya HARIAN
							"		left join ( "+							
							"			select a.nik,sum(a.nilai) as rem_harian "+
							"			from gr_gaji_d a "+ 
							"			inner join gr_gaji_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi and b.dc = 'D'  "+
							"			where a.kode_lokasi='"+this.app._lokasi+"' and b.flag_rutin = '1' and a.no_gaji = '"+this.e_nb.getText()+"' "+
							"			group by a.nik "+										
							"		) f on a.nik=f.nik "+

							"	where d.flag_pajak = '1' and a.no_gaji='"+this.e_nb.getText()+"' "+
							"	group by a.nik,b.sts_pajak,a.kode_lokasi,b.flag_gaji,g.pengali,c.nilai,c.biaya_jab,c.jab_max,isnull(e.nilai_tambah,0),isnull(f.rem_harian,0) "+
							"	) x  "+

							"	left join gr_pph21 y on x.pkp between y.bawah and y.atas and x.kode_lokasi=y.kode_lokasi  "+
							"	where case when y.persen is null then 0 else round((y.nilai_seb+((x.pkp - y.kurang_seb) * y.persen/100)) / 12,0) end > 0  "+							


							") a "+
							"	 inner join gr_karyawan x on a.nik=x.nik and a.kode_lokasi=x.kode_lokasi "+
							"    inner join gr_gaji_akun y on a.nik=y.nik and a.kode_lokasi=y.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"'");

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
					this.cb_bukti.setSQL("select no_gaji, keterangan from gr_gaji_m where no_gaji not in (select distinct ref2 from gr_pb_m where kode_lokasi='"+this.app._lokasi+"' and modul='GAJI') and periode = '"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_gaji","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Penggajian",true);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;						
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);
			this.cb_bukti.setSQL("select no_gaji, keterangan from gr_gaji_m where no_gaji not in (select distinct ref2 from gr_pb_m where kode_lokasi='"+this.app._lokasi+"' and modul='GAJI') and periode = '"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_gaji","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Penggajian",true);
		}
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
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



