window.app_saku2_transaksi_investasi_fObliAmor = function(owner)
{
	if (owner)
	{		
		window.app_saku2_transaksi_investasi_fObliAmor.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_investasi_fObliAmor";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perhitungan Amortisasi Obligasi: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_drk = new saiCBBL(this,{bound:[20,18,200,20],caption:"DRK Amortisasi", multiSelection:false, maxLength:10, tag:2 });		
		this.cb_buat = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });		
		this.e_nilai = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Total Amortisasi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new portalui_button(this,{bound:[620,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
		
		this.p1 = new panel(this,{bound:[20,23,900,353],caption:"Data Obligasi"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:12,tag:0,
		            colTitle:["No Beli","Jenis","Nama","Akun Obli","Akun Amor","Nilai Nominal","Nilai Oleh","Tgl Mulai","Tgl Akhir","Akru Sblm","Jml Hari","Nilai Amor"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[100,70,80,80,80,100,100,80,80,180,80,100]],
					colFormat:[[5,6,10,11],[cfNilai,cfNilai,cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	

		this.p2 = new panel(this,{bound:[20,24,900,323],caption:"Data Jurnal Rekap",visible:false});
		this.sg2 = new saiGrid(this.p2,{bound:[1,20,this.p2.width-5,this.p2.height-50],colCount:3,tag:0,
		            colTitle:["Akun Obli","Akun Amor","Nilai Amor"],
					colWidth:[[2,1,0],[100,80,80]],
					colFormat:[[2],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
				
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
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
									
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PPINV') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																											
					if (line.kode_spro == "PPINV") this.kodepp = line.flag;			
				}
			} 

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_investasi_fObliAmor.extend(window.childForm);
window.app_saku2_transaksi_investasi_fObliAmor.implement({	
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
			this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into inv_obliamor_m(no_amor,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,kode_lokasi,periode,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','F','OBLIAMOR','"+this.cb_buat.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");										
					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(2,i)) > 0 ) {
									var akunDr = this.sg2.cells(0,i);
									var akunCr = this.sg2.cells(1,i);
									var jenis1 = "OBLI";
									var jenis2 = "AMOR";
								} else {
									var akunDr = this.sg2.cells(1,i);
									var akunCr = this.sg2.cells(0,i);
									var jenis1 = "AMOR";
									var jenis2 = "OBLI";
								}					
								var nilai = Math.abs(nilaiToFloat(this.sg2.cells(2,i)));					
								var n = i*2;
								var j = 1+n;
								var k = 2+n;
								if (nilai != 0) {
									sql.add("insert into inv_obliamor_j(no_amor,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
											"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+j+",'"+akunDr+"','"+this.e_ket.getText()+"','D',"+nilai+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','OBLAMOR','"+jenis1+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");					
									sql.add("insert into inv_obliamor_j(no_amor,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
											"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+k+",'"+akunCr+"','"+this.e_ket.getText()+"','C',"+nilai+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','OBLAMOR','"+jenis2+"','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");								
								}								
							}
						}
					}
					
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						sql.add("insert into inv_obliamor_d( no_amor, kode_lokasi, periode, no_beli, kode_jenis, akun_obligasi, akun_amor, tgl_akru_seb, tgl_akru, jml_hari, nilai, dc) values "+
					            "('"+this.e_nb.getText()+"','"+this.app._lokasi+"', '"+this.e_periode.getText()+"', '"+line.no_beli+"', '"+line.kode_jenis+"', '"+line.akun_obligasi+"', '"+line.akun_amor+"', '"+line.tgl_akru_before+"', '"+line.tgl_akru+"', "+line.jml_hari+", "+line.amor_final+", 'D')");												
						sql.add("update inv_obli_d set tgl_akru_seb=tgl_akru,tgl_akru='"+line.tgl_akru+"' where no_beli='"+line.no_beli+"' and kode_jenis='"+line.kode_jenis+"'");
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
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.e_nb.setText("");
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and tipe = 'posting' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Daftar DRK",true);
			this.dataJU.rs.rows = [];
			this.sg.clear(1); 
			this.e_nilai.setText("0");
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_obliamor_m","no_amor",this.app._lokasi+"-OBAM"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
	},
	doLoadData: function(sender){
		this.e_nilai.setText("0");		
		var strSQL = "select a.no_beli,a.kode_jenis,b.nama,c.akun_obligasi,c.akun_amor, "+
				"a.nilai,a.nilai_beli,a.nilai-a.nilai_beli as selisih, a.tgl_akru as tgl_akru_before, "+
				"convert(varchar,a.tgl_mulai,103)as tgl_mulai, "+
				"convert(varchar,a.tgl_selesai,103)as tgl_selesai, "+
				"convert(varchar,a.tgl_akru,103)as tgl_akru_seb, "+
				"datediff(day,a.tgl_mulai,a.tgl_selesai) as jml_all, "+
				"dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0)) as tgl_akhir_bulan, "+				
				"case when a.tgl_selesai <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) then a.tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) end as tgl_akru, "+

				"datediff(day,a.tgl_akru,case when a.tgl_selesai <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) "+
				"						then a.tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) end) as jml_hari, "+
				"ceiling(datediff(day,a.tgl_akru, "+
				"	 case when a.tgl_selesai <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) "+
				"	 then a.tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) end) * (a.nilai-a.nilai_beli) / datediff(day,a.tgl_mulai,a.tgl_selesai) ) as amor_default, "+
				"isnull(d.tot_amor,0) as tot_amor_seb, "+

				"case when a.nilai-a.nilai_beli > 0 then "+
				"( "+
				"case when a.nilai-a.nilai_beli - isnull(d.tot_amor,0) <= ceiling(datediff(day,a.tgl_akru, "+
				"	 case when a.tgl_selesai <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) "+
				"	 then a.tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) end) * (a.nilai-a.nilai_beli) / datediff(day,a.tgl_mulai,a.tgl_selesai) ) "+
				"then a.nilai-a.nilai_beli - isnull(d.tot_amor,0) "+
				"else ceiling(datediff(day,a.tgl_akru, "+
				"	 case when a.tgl_selesai <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) "+
				"	 then a.tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) end) * (a.nilai-a.nilai_beli) / datediff(day,a.tgl_mulai,a.tgl_selesai) ) end  "+
				") "+
				"else "+ 
				"( "+
				"case when a.nilai-a.nilai_beli - isnull(d.tot_amor,0) >= ceiling(datediff(day,a.tgl_akru, "+
				"	 case when a.tgl_selesai <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) "+
				"	 then a.tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) end) * (a.nilai-a.nilai_beli) / datediff(day,a.tgl_mulai,a.tgl_selesai) ) "+
				"then a.nilai-a.nilai_beli - isnull(d.tot_amor,0) "+
				"else ceiling(datediff(day,a.tgl_akru, "+
				"	 case when a.tgl_selesai <= (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) "+
				"	 then a.tgl_selesai else (dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.dp_d1.getDateString()+"')+1,0))) end) * (a.nilai-a.nilai_beli) / datediff(day,a.tgl_mulai,a.tgl_selesai) ) end "+
				") "+
				"end as amor_final "+

				"from inv_obli_d a "+
				"  inner join inv_oblijenis b on a.kode_jenis=b.kode_jenis "+
				"  inner join inv_obligor c on b.kode_obligor=c.kode_obligor "+
				"  left join (select no_beli,kode_jenis,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_amor "+
				"			 from inv_obliamor_d group by no_beli,kode_jenis,kode_lokasi) d on a.no_beli=d.no_beli and a.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi "+
				"where "+
				"a.nilai-a.nilai_beli <> isnull(d.tot_amor,0) and a.tgl_akru<a.tgl_selesai and status='HTM' and a.no_oblijual='-'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			var line;
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				tot += parseFloat(line.amor_final);
			}					
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();			
			this.doTampilData(1);
			
			this.e_nilai.setText(floatToNilai(tot));
			
			this.sg2.clear();
			var nilaiamor = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				nilaiamor = parseFloat(line.amor_final);				
				var isAda = false;
				var idx = totalamor = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (line.akun_obligasi == this.sg2.cells(0,j) && line.akun_amor == this.sg2.cells(1,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}				
				if (!isAda) {
					this.sg2.appendData([line.akun_obligasi,line.akun_amor,floatToNilai(nilaiamor)]);
				} 
				else { 					
					totalamor = nilaiToFloat(this.sg2.cells(2,idx));
					totalamor = totalamor + nilaiamor;
					this.sg2.setCell(2,idx,totalamor);
				}			
			}
			
		} else this.sg.clear(1);									
	},	
	doTampilData: function(page) {		
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];				
			this.sg.appendData([line.no_beli,line.kode_jenis,line.nama,line.akun_obligasi,line.akun_amor,floatToNilai(line.nilai),floatToNilai(line.nilai_beli),line.tgl_mulai,line.tgl_selesai,line.tgl_akru_seb,floatToNilai(line.jml_hari),floatToNilai(line.amor_final)]);			
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