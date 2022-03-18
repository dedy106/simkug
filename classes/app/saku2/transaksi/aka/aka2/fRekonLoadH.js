window.app_saku2_transaksi_aka_aka2_fRekonLoadH = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_aka2_fRekonLoadH.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_aka_aka2_fRekonLoadH";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Rekonsiliasi Pelunasan Tagihan : Pembatalan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,220,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", readOnly:true});				
		this.cb_titip = new saiCBBL(this,{bound:[20,18,220,20],caption:"Akun Pelunasan", readOnly:true});
		this.cb_buat = new saiCBBL(this,{bound:[20,16,220,20],caption:"NIK Pembuat",  readOnly:true});
		//this.e_piutang = new saiLabelEdit(this,{bound:[820,16,200,20],caption:"Total Tagihan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		this.cb_app = new saiCBBL(this,{bound:[20,17,220,20],caption:"NIK Approve",  readOnly:true});
		this.e_nilai = new saiLabelEdit(this,{bound:[20,18,200,20],caption:"Total Pelunasan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		/*
		this.p1 = new panel(this,{bound:[20,23,1000,320],caption:"Data Pelunasan"});
		this.sg = new saiGrid(this.p1,{bound:[1,5,this.p1.width-5,this.p1.height-35],colCount:11,tag:9,
		            colTitle:["NIM","Nama","No Invoice","Periode","Kode Produk","Nama Produk","Akun Piutang","Saldo Tagihan","Nilai Pelunasan","ID Bank","Kode PP"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[80,80,100,100,70,100,80,80,150,150,80]],
					colFormat:[[7,8],[cfNilai,cfNilai]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10],[]],
					nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:bsAll,grid:this.sg,pager:[this,"doPager"]});			
		*/
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
window.app_saku2_transaksi_aka_aka2_fRekonLoadH.extend(window.childForm);
window.app_saku2_transaksi_aka_aka2_fRekonLoadH.implement({
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					//this.sg.clear(1); 
					setTipeButton(tbHapus);
				break;
			case "hapus" :	
				var strSQL = "select top 1 no_tak from aka_bill_bea where no_rekon='"+this.e_nb.getText()+"' and no_tak<>'-'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					system.alert(this,"Transaksi tidak valid.","Data Rekon sudah di TAK.["+line.no_tak+"]");
					return false;
				}
				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				else {
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from aka_rekon_m where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from aka_rekon_d where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from aka_rekon_j where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update aka_bill_bea set no_rekon='-',pakai=0 where no_rekon='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	doChange: function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.e_nb.setSQL("select no_rekon, keterangan from aka_rekon_m where modul in ('LOAD') and posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_rekon","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			//this.e_piutang.setText("0");
			this.e_nilai.setText("0");			
			var data = this.dbLib.getDataProvider(
					   "select distinct convert(varchar,tanggal,103) as tanggal,a.nilai,a.keterangan,a.periode,a.akun_titip,a.nim,c.nama as nama_titip,a.nik_buat,a.nik_app,d.nama as nama_buat,e.nama as nama_app "+
					   "from aka_rekon_m a "+
					   "	inner join masakun c on a.akun_titip=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					   "	inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi "+
					   "	inner join karyawan e on a.nik_app=e.nik and a.kode_lokasi=e.kode_lokasi "+
					   "where a.no_rekon='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.e_ket.setText(line.keterangan);
					this.e_nilai.setText(floatToNilai(line.nilai));
					this.cb_titip.setText(line.akun_titip,line.nama_titip);
					this.cb_buat.setText(line.nik_buat,line.nama_buat);
					this.cb_app.setText(line.nik_app,line.nama_app);
				} 
			}
			/*
			var strSQL = "select aa.nim,aa.nama as mhs,a.no_inv,a.periode,a.kode_produk,a.kode_pp,c.nama,a.akun_piutang,(a.nilai-isnull(b.tot_lunas,0)) as saldo,xx.nilai as lunas,xx.id_bank "+
						 "from aka_rekon_d xx "+
						 "      inner join ( "+
						 
						 "		select kode_lokasi,'20'+substring(no_inv,7,4) as periode,no_inv,nim,kode_pp,kode_akt,kode_jalur,kode_produk,akun_piutang,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
						 "      from aka_bill_d "+
						 "      where kode_lokasi='"+this.app._lokasi+"' "+
						 "      group by kode_lokasi,no_inv,nim,kode_pp,kode_akt,kode_jalur,kode_produk,akun_piutang "+
						 "      ) a on a.no_inv=xx.no_inv and a.kode_produk=xx.kode_produk and a.kode_lokasi=xx.kode_lokasi "+
						 
						 "      inner join aka_mahasiswa aa on aa.nim=a.nim and aa.kode_lokasi=aa.kode_lokasi "+
						 "      inner join aka_produk c on a.kode_produk=c.kode_produk and a.kode_lokasi=c.kode_lokasi and a.kode_akt=c.kode_akt and a.kode_pp=c.kode_pp and a.kode_jalur=c.kode_jalur "+
						 
						 "      left join (select no_inv,nim,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_lunas "+
						 "                 from aka_rekon_d where no_rekon <> '"+this.e_nb.getText()+"' group by nim,no_inv,kode_produk,kode_lokasi) b on a.nim=b.nim and a.no_inv=b.no_inv and a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+
						 
						 "where (a.nilai-isnull(b.tot_lunas,0)) > 0 and xx.no_rekon='"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by aa.nim,a.kode_produk";
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				var line;
				var tot = tot2 = 0;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					tot = tot + parseFloat(line.saldo);
					tot2 = tot2 + parseFloat(line.lunas);
				}		
				this.e_piutang.setText(floatToNilai(tot));
				this.e_nilai.setText(floatToNilai(tot2));
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);
*/			
		}
	},
	/*
	doTampilData: function(page) {
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.nim,line.mhs,line.no_inv,line.periode,line.kode_produk,line.nama,line.akun_piutang,floatToNilai(line.saldo),floatToNilai(line.lunas),line.id_bank,line.kode_pp]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
*/	
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