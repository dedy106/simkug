window.app_saku2_transaksi_aka_fBeaSisihH = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_fBeaSisihH.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_fBeaSisihH";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Beban Penyisihan Beasiswa : Pembatalan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});				
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", readOnly:true});		
		this.cb_drk = new saiCBBL(this,{bound:[20,18,200,20],caption:"DRK Beasiswa", readOnly:true});
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", readOnly:true});
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", readOnly:true});
		this.e_nilai = new saiLabelEdit(this,{bound:[660,17,200,20],caption:"Total Penyisihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
	
		this.p1 = new panel(this,{bound:[20,23,840,333],caption:"Data Jurnal Penyisihan"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:7,tag:0,
		            colTitle:["Akun Beban","Nama Akun","Akun BDD","Nama Akun","Kode PP","Nama PP","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[100,150,80,150,80,150,80]],
					colFormat:[[6],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});	
		
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
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_aka_fBeaSisihH.extend(window.childForm);
window.app_saku2_transaksi_aka_fBeaSisihH.implement({
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
			case "simpan" :
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
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
			case "ubah" :	
				this.ubah();
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
					sql.add("delete from aka_beasisih_m where no_sisih = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");					
					sql.add("delete from aka_beasisih_j where no_sisih = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");										
					var perBefore = getPrevPeriode(this.perLama);
					sql.add("update a set a.periode_sisih='"+perBefore+"' "+
							"from aka_bill_d a inner join aka_beasisih_d b on a.no_inv=b.no_inv and a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+
							"where b.no_sisih = '"+this.e_nb.getText()+"' and b.kode_lokasi = '"+this.app._lokasi+"'");					
					sql.add("delete from aka_beasisih_d where no_sisih = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");					
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
	doLoadData: function(sender){
	    this.e_nilai.setText("0");		
		var strSQL = "select bb.akun_bp,x.nama as nama_bp,a.akun_piutang,y.nama as nama_piutang,e.kode_pp,e.nama as nama_pp, "+
					 "	sum(case when a.nilai-isnull(xx.tot_batal,0)-isnull(d.tot_sisih,0) > (case when a.kode_produk in ('BPP','S2BPP') then ceiling(a.nilai/6) else a.nilai end) "+
					 "		 then (case when a.kode_produk in ('BPP','S2BPP') then ceiling((a.nilai-isnull(xx.tot_batal,0))/6) else (a.nilai-isnull(xx.tot_batal,0)) end) "+
					 "		 else a.nilai-isnull(xx.tot_batal,0)-isnull(d.tot_sisih,0) end) as nilai_sisih "+
					 "	from aka_bill_d a  "+
					 "       inner join aka_bill_m aa on a.no_bill=aa.no_bill and a.kode_lokasi=aa.kode_lokasi "+
					 "       inner join aka_produk bb on a.kode_produk=bb.kode_produk and a.kode_lokasi=bb.kode_lokasi "+
					 "		 inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi "+
					 "		 inner join aka_jurusan c on b.kode_jur=c.kode_jur and a.kode_lokasi=c.kode_lokasi "+
					 "		 inner join pp e on e.kode_pp=c.kode_pp and e.kode_lokasi=c.kode_lokasi "+ 
					 "		 inner join masakun x on bb.akun_bp=x.kode_akun and bb.kode_lokasi=x.kode_lokasi  "+
					 "		 inner join masakun y on a.akun_piutang=y.kode_akun and a.kode_lokasi=y.kode_lokasi "+
					 "       inner join aka_beasisih_d ab on a.no_inv=ab.no_inv and a.kode_produk=ab.kode_produk and a.kode_lokasi=ab.kode_lokasi "+
					 "	   left join  "+
					 "		 (select no_inv,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_sisih  "+
					 "		  from aka_beasisih_d where kode_lokasi = '"+this.app._lokasi+"' and no_sisih <> '"+this.e_nb.getText()+"' group by no_inv,kode_produk,kode_lokasi) d on  "+
					 "		  a.no_inv=d.no_inv and a.kode_produk=d.kode_produk and a.kode_lokasi=d.kode_lokasi  "+					 
					 "     left join "+
					 "       (select no_inv,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_batal "+
					 "        from aka_batal_d where kode_lokasi = '"+this.app._lokasi+"' group by no_inv,kode_produk,kode_lokasi) xx on "+
					 "        a.no_inv=xx.no_inv and a.kode_produk=xx.kode_produk and a.kode_lokasi=xx.kode_lokasi "+
					 "	where aa.jenis='BEA' and a.kode_lokasi = '"+this.app._lokasi+"' "+
					 " 	and a.nilai-isnull(xx.tot_batal,0) > isnull(d.tot_sisih,0) and ab.no_sisih = '"+this.e_nb.getText()+"' "+
					 "	group by bb.akun_bp,x.nama,a.akun_piutang,y.nama,e.kode_pp,e.nama order by bb.akun_bp";
		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			var line;
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				tot = tot + parseFloat(line.nilai_sisih);
			}		
			this.e_nilai.setText(floatToNilai(tot));
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);	
	},
	doChange:function(sender){
		if (sender == this.e_periode) {
			if (this.e_periode.getText()!="")  {
				this.cb_drk.setSQL("select kode_drk, nama from drk where tipe ='posting' and kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.e_periode.getText().substr(0,4)+"' ",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);
				this.e_nb.setSQL("select no_sisih, keterangan from aka_beasisih_m where modul = 'BEASISIH' and posted ='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_sisih","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti Penyisihan",true);
			}
			this.dataJU.rs.rows = [];
			this.sg.clear(1);			
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider(
					   "select convert(varchar,tanggal,103) as tanggal,a.periode,a.keterangan,a.kode_drk,c.nama as nama_drk,a.nik_buat,a.nik_app,b.nama as nama_buat,d.nama as nama_app "+
					   "from aka_beasisih_m a "+
			           "	inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi "+
					   "	inner join karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi "+
			           "	inner join drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi and c.tahun = '"+this.e_periode.getText().substr(0,4)+"' "+
					   "where a.no_sisih='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.e_ket.setText(line.keterangan);
					this.cb_buat.setText(line.nik_buat,line.nama_buat);
					this.cb_app.setText(line.nik_app,line.nama_app);
					this.cb_drk.setText(line.kode_drk,line.nama_drk);
				} 
			}
			this.doLoadData();
		}
	},
	doTampilData: function(page) {
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.akun_bp,line.nama_bp,line.akun_piutang,line.nama_piutang,line.kode_pp,line.nama_pp,floatToNilai(line.nilai_sisih)]);
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
							system.info(this,"Transaksi telah sukses terhapus (No Bukti : "+ this.e_nb.getText()+")","");
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