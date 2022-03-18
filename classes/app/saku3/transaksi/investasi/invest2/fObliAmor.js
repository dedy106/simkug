window.app_saku3_transaksi_investasi_invest2_fObliAmor = function(owner)
{
	if (owner)
	{		
		window.app_saku3_transaksi_investasi_invest2_fObliAmor.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_invest2_fObliAmor";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perhitungan Amortisasi Obligasi", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Transaksi","List Transaksi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Progress","Catatan"],
					colWidth:[[4,3,2,1,0],[200,80,350,80,100]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_drk = new saiCBBL(this.pc2.childPage[0],{bound:[20,18,220,20],caption:"DRK Amortisasi", multiSelection:false, maxLength:10, tag:2 });		
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,18,200,20],caption:"Total Amortisasi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new portalui_button(this.pc2.childPage[0],{bound:[670,18,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,995,320], childPage:["Detail Obligasi"]});			
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:12,tag:0,
		            colTitle:["No Beli","Jenis","Nama","Akun Obli","Akun Amor","Nilai Nominal","Nilai Oleh","Tgl Mulai","Tgl Akhir","Akru Sblm","Jml Hari","Nilai Amor"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[100,70,80,80,80,100,100,80,80,180,80,100]],
					colFormat:[[5,6,10,11],[cfNilai,cfNilai,cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-10],colCount:3,tag:0,
		            colTitle:["Akun Obli","Akun Amor","Nilai Amor"],
					colWidth:[[2,1,0],[100,80,80]],
					colFormat:[[2],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
				
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
									
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('OBDRKSPI','PPINV') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																											
					if (line.kode_spro == "PPINV") this.kodepp = line.flag;		
					if (line.kode_spro == "OBDRKSPI") this.cb_drk.setText(line.flag);		
				}
			} 

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_invest2_fObliAmor.extend(window.childForm);
window.app_saku3_transaksi_investasi_invest2_fObliAmor.implement({	
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.stsSimpan == 0) {
						sql.add("delete from inv_obliamor_m where no_amor = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_obliamor_j where no_amor = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
						sql.add("update a set a.tgl_akru=a.tgl_akru_seb "+
								"from inv_obli_d a inner join inv_obliamor_d b on a.no_beli=b.no_beli and a.kode_jenis=b.kode_jenis "+
								"where b.no_amor='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");				
						sql.add("delete from inv_obliamor_d where no_amor = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					}
					
					sql.add("insert into inv_obliamor_m(no_amor,no_dokumen,tanggal,keterangan,kode_curr,kurs,nilai,kode_pp,kode_drk,posted,modul,nik_buat,kode_lokasi,periode,nik_user,tgl_input,no_app1,progress) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','IDR',1,"+parseNilai(this.e_nilai.getText())+",'"+this.kodepp+"','"+this.cb_drk.getText()+"','F','OBLIAMOR','"+this.cb_buat.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'-','0')");										
					
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
			case "ubah" :	
				this.preView = "1";
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
			case "hapus" :	
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from inv_obliamor_m where no_amor = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_obliamor_j where no_amor = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("update a set a.tgl_akru=a.tgl_akru_seb "+
					        "from inv_obli_d a inner join inv_obliamor_d b on a.no_beli=b.no_beli and a.kode_jenis=b.kode_jenis "+
							"where b.no_amor='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");				
					sql.add("delete from inv_obliamor_d where no_amor = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
			if (this.stsSimpan == 0){
				this.sg.clear(1); 
				this.sg2.clear(1); 
				this.sg3.clear(1);			
				this.bTampil.show();
				this.bUpload.show();
			}
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_obliamor_m","no_amor",this.app._lokasi+"-OBAM"+this.e_periode.getText().substr(2,4)+".","0000"));
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
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
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
								this.pc2.hide();   
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
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();
				this.pc2.show();   
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);															
			this.dataJU.rs.rows = [];					
			this.sg.clear(1);
			this.sg3.clear(1);
			this.sg2.clear(1);
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.doClick(this.i_gen);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		} 
		catch(e) {
			alert(e);
		}
	}
	/*
	
	doLoad3:function(sender){														
		var strSQL = "select a.no_spi,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.progress,b.catatan "+
		             "from inv_oblispi_m a "+					 
					 "     left join inv_app2_m b on a.no_app1=b.no_app  and b.no_flag='-' and b.form='APPMAN' "+					 
					 "     left join (select distinct no_spi from inv_oblispi_d where dc ='D' and flag_rev<>'-' and kode_lokasi='"+this.app._lokasi+"') c on a.no_spi=c.no_spi "+
					 "where a.posted='F' and c.no_spi is null and a.progress in ('0','M') and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and c.no_spi is null ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.sg3.clear();
			this.page=1;
			for (var i=0;i<this.dataJU3.rs.rows.length;i++){
				line = this.dataJU3.rs.rows[i];													
				this.sg3.appendData([line.no_spi,line.tgl,line.keterangan,line.progress,line.catatan]); 
			}			
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);								
		this.page = page;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	}
	
	*/
	
});