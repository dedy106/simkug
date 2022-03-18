window.app_saku2_transaksi_yks_fRevBillE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_fRevBillE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_yks_fRevBillE";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reverse Data Billing: Hapus", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});				
		this.e_dok = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});				
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.e_debet = new saiLabelEdit(this,{bound:[720,15,200,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});				
		this.e_kredit = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,340], childPage:["Detail Billing","Jurnal Reverse"]});		
		this.sg = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:13,tag:0,
				colTitle:["Kode Mitra","Tgl Keluar","NIK","Nama","Loker","Loker Valid","Area Host","Band","NIKKES","Nama Pasien","Kode Biaya","Nama Biaya","Total Nilai"],
				colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,70,100,70,70,70,80,70,100,70,100,70]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10,11,12],[]],
				colFormat:[[12],[cfNilai]],autoAppend:false,defaultRow:1
		});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis","Kode DRK"],
					colWidth:[[6,5,4,3,2,1,0],[80,80,100,240,50,200,100]],
					columnReadOnly:[true,[0,1,2,4,5,6],[3]],
					colFormat:[[4],[cfNilai]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg2});		
		this.cb1 = new portalui_checkBox(this.sgn2,{bound:[840,5,100,25],caption:"Preview",selected:true});
	
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='JUAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");		
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='PPBPCC' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.kodepp = line.flag;
			} else this.kodepp = '-';
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_yks_fRevBillE.extend(window.childForm);
window.app_saku2_transaksi_yks_fRevBillE.implement({
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
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg.clear(1); this.sg2.clear(1);
					setTipeButton(tbHapus);
				break;
			case "ubah" :					
				break;				
			case "simpancek" : this.simpan();			
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
					sql.add("delete from yk_valid_m where no_valid='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_valid_j where no_valid='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from yk_rekon_d where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("update a set a.flag_aktif='1' "+
							"from yk_bill_d a inner join yk_bill_rev b on a.no_bill=b.no_bill and a.nik=b.nik and a.nikkes=b.nikkes and a.kode_produk=b.kode_produk and a.tgl_keluar=b.tgl_keluar "+
							"where b.jenis = 'BILL' and b.no_rev='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("update a set a.flag_aktif='1' "+
							"from yk_billkunj_d a inner join yk_bill_rev b on a.no_bill=b.no_bill and a.nik=b.nik and a.nikkes=b.nikkes and a.kode_produk=b.kode_produk and a.tgl_masuk=b.tgl_keluar "+
							"where  b.jenis = 'KUNJ' and b.no_rev='"+this.e_nb.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from yk_bill_rev where no_rev='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);		
	},
	doChange : function(sender) {
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.e_nb.setSQL("select a.no_valid, a.keterangan from yk_valid_m a "+
			                 "where a.modul = 'ARREV' and a.posted='F' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["no_valid","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			this.pc1.setActivePage(this.pc1.childPage[1]);
			var data = this.dbLib.getDataProvider(
			           "select a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.periode,a.keterangan,a.nik_buat,b.nama as nama_buat,a.nik_app,c.nama as nama_app "+
			           "from yk_valid_m a "+
			           "	inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
			           "	inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi "+
					   "where a.no_valid='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.e_dok.setText(line.no_dokumen);
					this.e_ket.setText(line.keterangan);
					this.cb_buat.setText(line.nik_buat,line.nama_buat);
					this.cb_app.setText(line.nik_app,line.nama_app);					
				} 
			}															
			var data = this.dbLib.getDataProvider("select a.kode_vendor,convert(varchar,a.tgl_keluar,103) as no_ref,a.nik,a.nama,a.loker,a.loker_valid,b.kode_lokasi,a.band,a.nikkes,a.pasien,a.kode_produk,c.nama as nama_produk,a.nilai "+
						  "from yk_bill_d a inner join cust b on a.loker_valid=b.kode_cust inner join yk_produk c on a.kode_produk=c.kode_produk "+
						  "                 inner join yk_bill_rev cc on a.no_bill=cc.no_bill and a.nik=cc.nik and a.nikkes=cc.nikkes and a.kode_produk=cc.kode_produk and a.tgl_keluar=cc.tgl_keluar "+
						  "where cc.jenis = 'BILL' and a.flag_aktif ='X' and a.kode_lokasi = '"+this.app._lokasi+"' and cc.no_rev='"+this.e_nb.getText()+"' "+
						  "union "+
						  "select '-' as kode_vendor,convert(varchar,a.tgl_masuk,103) as no_ref,a.nik,a.nama,a.loker,a.loker_valid,b.kode_lokasi,a.band,a.nikkes,a.pasien,a.kode_produk,c.nama as nama_produk,a.umum+a.gigi+a.kbia+a.matkes+a.cs as nilai "+
						  "from yk_billkunj_d a inner join cust b on a.loker_valid=b.kode_cust inner join yk_kunj c on a.kode_produk=c.kode_produk "+
						  "                     inner join yk_bill_rev cc on a.no_bill=cc.no_bill and a.nik=cc.nik and a.nikkes=cc.nikkes and a.kode_produk=cc.kode_produk and a.tgl_masuk=cc.tgl_keluar "+
						  "where cc.jenis = 'KUNJ' and a.flag_aktif ='X' and a.kode_lokasi = '"+this.app._lokasi+"' and cc.no_rev='"+this.e_nb.getText()+"' "+
						  " ",true);			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);			
			
			var data2 = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.jenis,a.kode_drk "+
						"from yk_valid_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+						
						"where a.no_valid = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);			
			if (typeof data2 == "object" && data.rs.rows[0] != undefined){
				var line2;
				this.sg2.clear();
				for (var i in data2.rs.rows){
					line2 = data2.rs.rows[i];							
					this.sg2.appendData([line2.kode_akun,line2.nama_akun,line2.dc,line2.keterangan,floatToNilai(line2.nilai),line2.jenis,line2.kode_drk]);
				}
			} else this.sg2.clear(1);	
			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
	},	
	doTampilData: function(page) {		
		this.sg.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.kode_vendor,line.no_ref,line.nik,line.nama,line.loker,line.loker_valid,line.kode_lokasi,line.band,line.nikkes,line.pasien,line.kode_produk,line.nama_produk,floatToNilai(line.nilai)]);
		}
		this.sg.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
					if (this.sg2.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg2.cells(4,i));
					if (this.sg2.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg2.cells(4,i));
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan.");							
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