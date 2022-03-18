window.app_saku2_transaksi_investasi_fObliAmorE = function(owner)
{
	if (owner)
	{		
		window.app_saku2_transaksi_investasi_fObliAmorE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_investasi_fObliAmorE";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Perhitungan Amortisasi Obligasi: Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_drk = new saiCBBL(this,{bound:[20,18,200,20],caption:"DRK Amortisasi", multiSelection:false, maxLength:10, tag:2 });		
		this.cb_buat = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });		
		this.e_nilai = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Total Amortisasi", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
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
		
		setTipeButton(tbHapus);
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
window.app_saku2_transaksi_investasi_fObliAmorE.extend(window.childForm);
window.app_saku2_transaksi_investasi_fObliAmorE.implement({	
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
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); 
					setTipeButton(tbHapus);
				break;			
			case "hapus" :	
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
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {			
			this.e_nb.setSQL("select no_amor, keterangan from inv_obliamor_m where posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_amor","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider("select periode,tanggal,keterangan,nik_buat,kode_drk from inv_obliamor_m where no_amor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;					
					this.dp_d1.setText(line.tanggal);
					this.e_ket.setText(line.keterangan);					
					this.cb_drk.setText(line.kode_drk);	
					this.cb_buat.setText(line.nik_buat);					
				} 
			}
			this.doLoadData();
		}
	},	
	doLoadData: function(sender){
		this.e_nilai.setText("0");			
		var strSQL = "select b.no_beli,b.kode_jenis,c.nama,a.akun_obligasi,a.akun_amor,b.nilai as nilai_oleh,b.nilai_beli,convert(varchar,b.tgl_mulai,103) as tgl_mulai,convert(varchar,b.tgl_selesai,103) as tgl_selesai,convert(varchar,a.tgl_akru_seb,103) as tgl_akru_seb,a.jml_hari,a.nilai "+
		             "from inv_obliamor_d a inner join inv_obli_d b on a.no_beli=b.no_beli and a.kode_jenis=b.kode_jenis "+
					 "                      inner join inv_oblijenis c on b.kode_jenis=c.kode_jenis "+
		             "where a.no_amor = '"+this.e_nb.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ";				
		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			var line;
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				tot += parseFloat(line.nilai);
			}					
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();			
			this.doTampilData(1);
			
			this.e_nilai.setText(floatToNilai(tot));
			
			this.sg2.clear();
			var nilaiamor = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				nilaiamor = parseFloat(line.nilai);				
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
			this.sg.appendData([line.no_beli,line.kode_jenis,line.nama,line.akun_obligasi,line.akun_amor,floatToNilai(line.nilai_oleh),floatToNilai(line.nilai_beli),line.tgl_mulai,line.tgl_selesai,line.tgl_akru_seb,floatToNilai(line.jml_hari),floatToNilai(line.nilai)]);			
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
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");
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