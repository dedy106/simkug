window.app_saku2_transaksi_kopeg_piutang_fSisih = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_piutang_fSisih.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_piutang_fSisih";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyisihan Piutang : Proses", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_drk = new saiCBBL(this,{bound:[20,18,200,20],caption:"DRK Penyisihan", multiSelection:false, maxLength:10, tag:2 });
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2 });
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.e_nilai = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Total Penyisihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new portalui_button(this,{bound:[620,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
	
		this.p1 = new panel(this,{bound:[20,23,900,333],caption:"Data Jurnal Penyisihan"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:8,tag:0,
		            colTitle:["No Piutang","Keterangan","Cust","Tanggal","Saldo","Umur","Nilai","Kode PP"],
					colWidth:[[7,6,5,4,3,2,1,0],[60,80,60,80,80,200,180,100]],
					colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	
		
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
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='ARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('BBNSIH','PIUSIH') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "PIUSIH") this.akunSisih = line.flag;								
					if (line.kode_spro == "BBNSIH") this.akunBeban = line.flag;								
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_piutang_fSisih.extend(window.childForm);
window.app_saku2_transaksi_kopeg_piutang_fSisih.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"piutang_sisih_m","no_sisih",this.app._lokasi+"-SSH"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into piutang_sisih_m(no_sisih,no_dokumen,tanggal,keterangan,nilai,kode_pp,kode_drk,posted,modul,nik_buat,nik_app,kode_lokasi,periode,nik_user,tgl_input) values "+
						    "('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+parseNilai(this.e_nilai.getText())+",'"+this.app._kodePP+"','"+this.cb_drk.getText()+"','F','SISIH','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");					
					
					sql.add("insert into piutang_sisih_d(no_sisih,kode_cust,no_piutang,periode,nilai,kode_lokasi,akun_beban,akun_sisih,kode_pp,kode_drk,dc,no_rev) "+
							"select '"+this.e_nb.getText()+"',kode_cust,no_piutang,'"+this.e_periode.getText()+"',nilai,kode_lokasi,akun_beban,akun_sisih,kode_pp,kode_drk,'C',no_sisih "+
							"from piutang_sisih_d where no_rev='-' and kode_lokasi='"+this.app._lokasi+"'");							
					sql.add("update piutang_sisih_d set no_rev='"+this.e_nb.getText()+"' where dc = 'D' and no_rev='-' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into piutang_sisih_j(no_sisih,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',98,akun_beban,'Reverse Penyisihan','C',sum(nilai),kode_pp,kode_drk,kode_lokasi,'REVSISIH','BEBAN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from piutang_sisih_d where no_sisih='"+this.e_nb.getText()+"' and dc='C' and kode_lokasi='"+this.app._lokasi+"' group by akun_beban,kode_pp,kode_drk,kode_lokasi");
					sql.add("insert into piutang_sisih_j(no_sisih,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',99,akun_sisih,'Reverse Penyisihan','D',sum(nilai),kode_pp,kode_drk,kode_lokasi,'REVSISIH','SISIH','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from piutang_sisih_d where no_sisih='"+this.e_nb.getText()+"' and dc='C' and kode_lokasi='"+this.app._lokasi+"' group by akun_sisih,kode_pp,kode_drk,kode_lokasi");
							
					sql.add("insert into piutang_sisih_d(no_sisih,kode_cust,no_piutang,periode,nilai,kode_lokasi,akun_beban,akun_sisih,kode_pp,kode_drk,dc,no_rev) "+
							"select '"+this.e_nb.getText()+"',c.kode_cust,a.no_piutang,'"+this.e_periode.getText()+"', "+
							"case when datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') >=5 and datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') < 12 then 0.25 * (a.nilai+a.nilai_ppn-isnull(b.bayar,0)) "+
							"     when datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') >=12 and datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') < 24 then 0.50 * (a.nilai+a.nilai_ppn-isnull(b.bayar,0)) "+
							"     when datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') >=24 then 1.00 * (a.nilai+a.nilai_ppn-isnull(b.bayar,0)) "+
							" end as nilai, "+		
							"a.kode_lokasi,'"+this.akunBeban+"','"+this.akunSisih+"',a.kode_pp,'"+this.cb_drk.getText()+"','D','-' "+
							"from piutang_m a inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
							"left join (select no_piutang,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bayar from piubayar_d group by no_piutang,kode_lokasi) b "+
							"on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
							"where a.nilai+a.nilai_ppn>isnull(b.bayar,0) and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and "+
							"case when datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') >=5 and datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') < 12 then 0.25 * (a.nilai+a.nilai_ppn-isnull(b.bayar,0)) "+
							"     when datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') >=12 and datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') < 24 then 0.50 * (a.nilai+a.nilai_ppn-isnull(b.bayar,0)) "+
							"     when datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') >=24 then 1.00 * (a.nilai+a.nilai_ppn-isnull(b.bayar,0)) "+
							" end > 0 ");
					
					sql.add("insert into piutang_sisih_j(no_sisih,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,akun_beban,'"+this.e_ket.getText()+"','D',sum(nilai),kode_pp,kode_drk,kode_lokasi,'SISIH','BEBAN','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from piutang_sisih_d where no_sisih='"+this.e_nb.getText()+"' and dc='D' and kode_lokasi='"+this.app._lokasi+"' group by akun_beban,kode_pp,kode_drk,kode_lokasi");
					sql.add("insert into piutang_sisih_j(no_sisih,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
							"select '"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,akun_sisih,'"+this.e_ket.getText()+"','C',sum(nilai),kode_pp,kode_drk,kode_lokasi,'SISIH','SISIH','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
							"from piutang_sisih_d where no_sisih='"+this.e_nb.getText()+"' and dc='D' and kode_lokasi='"+this.app._lokasi+"' group by akun_sisih,kode_pp,kode_drk,kode_lokasi");
							
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
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai penyisihan tidak boleh nol atau kurang.");
					return false;						
				}
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
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"piutang_sisih_m","no_sisih",this.app._lokasi+"-SSH"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
	},
	doLoadData: function(sender){
	    this.e_nilai.setText("0");					 
		var strSQL = "select a.no_piutang,a.keterangan,c.kode_cust +' - '+c.nama as cust,convert(varchar,a.tanggal,103) as tgl,datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') as bulan,(a.nilai+a.nilai_ppn-isnull(b.bayar,0)) as saldo,a.kode_pp, "+
				     "case when datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') >=5 and datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') < 12 then 0.25 * (a.nilai+a.nilai_ppn-isnull(b.bayar,0)) "+
					 "     when datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') >=12 and datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') < 24 then 0.50 * (a.nilai+a.nilai_ppn-isnull(b.bayar,0)) "+
					 "     when datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') >=24 then 1.00 * (a.nilai+a.nilai_ppn-isnull(b.bayar,0)) "+
					 " end as nilai "+		
		             "from piutang_m a inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi "+
					 "left join (select no_piutang,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bayar from piubayar_d group by no_piutang,kode_lokasi) b "+
					 "on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi "+
					 "where a.nilai+a.nilai_ppn>isnull(b.bayar,0) and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and "+
					 "case when datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') >=5 and datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') < 12 then 0.25 * (a.nilai+a.nilai_ppn-isnull(b.bayar,0)) "+
					 "     when datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') >=12 and datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') < 24 then 0.50 * (a.nilai+a.nilai_ppn-isnull(b.bayar,0)) "+
					 "     when datediff(month,a.tanggal,'"+this.dp_d1.getDateString()+"') >=24 then 1.00 * (a.nilai+a.nilai_ppn-isnull(b.bayar,0)) "+
					 " end > 0 ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			var line;			
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);	
		
		var tot = 0;
		for (var i=0;i < this.dataJU.rs.rows.length;i++){
			line = this.dataJU.rs.rows[i];
			tot = tot + parseFloat(line.nilai);
		}		
		this.e_nilai.setText(floatToNilai(tot));
	},
	doChange:function(sender){
		if (sender == this.e_periode) {
			if (this.e_periode.getText()!="")  this.cb_drk.setSQL("select kode_drk, nama from drk where tipe ='posting' and kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.e_periode.getText().substr(0,4)+"' ",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);
			this.dataJU.rs.rows = [];
			this.sg.clear(1);			
			this.e_nilai.setText("0");
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
			this.sg.appendData([line.no_piutang,line.keterangan,line.cust,line.tgl,floatToNilai(line.saldo),line.bulan,floatToNilai(line.nilai),line.kode_pp]);
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