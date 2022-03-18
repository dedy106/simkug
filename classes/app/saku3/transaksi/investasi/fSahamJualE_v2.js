window.app_saku3_transaksi_investasi_fSahamJualE = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_investasi_fSahamJualE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_investasi_fSahamJualE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penjualan Saham: Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,14,202,20],caption:"No Dokumen", maxLength:50});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,452,20],caption:"Deskripsi", maxLength:150});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.cb_drk = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode DRK", multiSelection:false, maxLength:10, tag:2});						
		this.cb_kelola = new saiCBBL(this,{bound:[20,12,200,20],caption:"MI", readOnly:true,change:[this,"doChange"]});				
		this.l_tgl2 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Settlement", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,11,100,18]}); 		
		this.e_komisi = new saiLabelEdit(this,{bound:[20,15,200,20],caption:"Nilai Komisi", tag:1, tipeText:ttNilai, text:"0", readOnly:true});		
		this.e_ppn = new saiLabelEdit(this,{bound:[20,16,200,20],caption:"Nilai VAT", tag:1, tipeText:ttNilai, text:"0" ,readOnly:true});		
		this.e_levi = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"N Levy+SalesTax", tag:1, tipeText:ttNilai, text:"0" ,readOnly:true});		
		this.e_total = new saiLabelEdit(this,{bound:[712,18,200,20],caption:"Total Jual", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_pph = new saiLabelEdit(this,{bound:[20,17,200,20],caption:"Nilai PPh", tag:1,  tipeText:ttNilai, text:"0",readOnly:true});		
		this.e_gainlos = new saiLabelEdit(this,{bound:[712,17,200,20],caption:"Total Gain/Loss", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new panel(this,{bound:[10,23,900,240],caption:"Daftar Penjualan Saham"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:15,tag:0,				
				colTitle:["Kd Saham","Nama Saham","Lbr Unit","Harga Oleh","Harga Buku","Harga Jual","Lbr Jual","Nilai Jual","Gain/Loss", "Komisi","VAT","Levy/STax","PPh","Broker","Nama"],
				colWidth:[[14,13,12,11,10,9, 8,7,6,5,4,3,2,1,0],[100,60,80,80,80,80,  80,100,90,90,90,90,60,180,60]],
				readOnly:true,
				colFormat:[[2,3,4,5,6,7,8,  9,10,11,12],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai,cfNilai]],				
				change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});				
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
		
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
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_investasi_fSahamJualE.extend(window.childForm);
window.app_saku3_transaksi_investasi_fSahamJualE.implement({
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
					sql.add("delete from inv_shmjual_m where no_shmjual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_shmjual_j where no_shmjual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_shmjual_d where no_shmjual='"+this.e_nb.getText()+"' ");
					
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i) && this.sg.cells(7,i) != ""){					
							sql.add("update inv_saham_d set jumlah=jumlah+"+nilaiToFloat(this.sg.cells(6,i))+" where kode_saham='"+this.sg.cells(0,i)+"' and kode_kelola='"+this.cb_kelola.getText()+"'");
						}
					}
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
		this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);					
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {	
			this.e_nb.setSQL("select no_shmjual, keterangan from inv_shmjual_m where modul='JUAL' and no_kasjual = '-' and posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_shmjual","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);			
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var strSQL = "select * from inv_shmjual_m where no_shmjual='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;					
					this.dp_d1.setText(line.tanggal);						
					this.dp_d2.setText(line.tgl_set);						
					this.e_ket.setText(line.keterangan);
					this.e_dok.setText(line.no_dokumen);
					this.cb_buat.setText(line.nik_buat);					
					this.cb_drk.setText(line.kode_drk);
					this.cb_kelola.setText(line.kode_kelola);		
					this.e_komisi.setText(floatToNilai(line.nilai_komisi));					
					this.e_ppn.setText(floatToNilai(line.nilai_ppn));					
					this.e_levi.setText(floatToNilai(line.nilai_levy));					
					this.e_pph.setText(floatToNilai(line.nilai_pph));										
				} 
			}						
			this.nik_user=this.app._nikUser;						
			var sql = "call sp_saham_tmp ('"+this.e_periode.getText()+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);	
			
			var strSQL = "select c.akun_gl,c.akun_spi,b.kode_saham,b.nama,a.jumlah+d.jumlah as jumlah,d.h_oleh,d.h_buku,d.h_jual,d.jumlah as jml,d.n_jual,gainlos,d.komisi,d.vat,d.levi,d.pph,d.kode_broker,e.nama as broker "+
						 "from inv_saham_tmp a inner join inv_saham b on a.kode_saham=b.kode_saham "+						 
			             "     inner join inv_kelola c on a.kode_kelola=c.kode_kelola "+
						 "     inner join inv_shmjual_d d on a.kode_saham=d.kode_saham and a.kode_kelola=d.kode_kelola "+
						 "     inner join inv_broker e on d.kode_broker=e.kode_broker "+
						 "where d.no_shmjual = '"+this.e_nb.getText()+"' and a.nik_user='"+this.nik_user+"' ";			
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																													
					this.sg.appendData([line.kode_saham,line.nama,floatToNilai(line.jumlah),floatToNilai(line.h_oleh),floatToNilai(line.h_buku),floatToNilai(line.h_jual),floatToNilai(line.jml),floatToNilai(line.n_jual),floatToNilai(line.gainlos), floatToNilai(line.komisi),floatToNilai(line.vat),floatToNilai(line.levi),floatToNilai(line.pph),line.kode_broker,line.broker]);															
				}
				this.akunSPI = line.akun_spi;				
				this.akunGL = line.akun_gl;				
			} else this.sg.clear(1);															
			
		}		
	},	
	doChangeCell: function(sender, col, row){					
		if (col == 6 || col == 7) {
			if (this.sg.cells(7,row) != "" && this.sg.cells(6,row) != "") {				
				this.sg.cells(5,row,parseFloat(nilaiToFloat(this.sg.cells(7,row)) /  nilaiToFloat(this.sg.cells(6,row))));
				//this.sg.cells(8,row,floatToNilai(Math.round(nilaiToFloat(this.sg.cells(7,row)) -  Math.round(nilaiToFloat(this.sg.cells(3,row)) * nilaiToFloat(this.sg.cells(6,row))))));		
				this.sg.cells(8,row,floatToNilai(Math.round(nilaiToFloat(this.sg.cells(7,row)) -  Math.round(nilaiToFloat(this.sg.cells(4,row)) * nilaiToFloat(this.sg.cells(6,row))))));		
			}		
			this.sg.validasi();
		}				
	},
	doNilaiChange: function(){
		try{			
			this.nilaiSaham = 0;
			var tot = gainlos = komisi = vat = levi = pph = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(7,i) != "" && this.sg.cells(8,i) != ""){
					tot += nilaiToFloat(this.sg.cells(7,i));				
					gainlos += nilaiToFloat(this.sg.cells(8,i));				
					//this.nilaiSaham += nilaiToFloat(this.sg.cells(3,i)) * nilaiToFloat(this.sg.cells(6,i));				
					this.nilaiSaham += nilaiToFloat(this.sg.cells(4,i)) * nilaiToFloat(this.sg.cells(6,i));				
					
					komisi += nilaiToFloat(this.sg.cells(9,i));				
					vat += nilaiToFloat(this.sg.cells(10,i));				
					levi += nilaiToFloat(this.sg.cells(11,i));				
					pph += nilaiToFloat(this.sg.cells(12,i));				
				}
			}	
			this.nilaiSaham = Math.round(this.nilaiSaham);
			this.e_total.setText(floatToNilai(tot));
			this.e_gainlos.setText(floatToNilai(gainlos));									
			
			this.e_komisi.setText(floatToNilai(komisi));						
			this.e_ppn.setText(floatToNilai(vat));						
			this.e_levi.setText(floatToNilai(levi));						
			this.e_pph.setText(floatToNilai(pph));						
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Bukti : "+ this.e_nb.getText()+")");							
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