window.app_saku2_transaksi_kopeg_apotek_fJualAggE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_apotek_fJualAggE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_apotek_fJualAggE";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penjualan Obat Peserta: Edit", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2,change:[this,"doChange"]});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, readOnly:true,change:[this,"doChange"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,13,225,20],caption:"No Resep", maxLength:100});						
		this.cb_icdx = new portalui_saiCBBL(this,{bound:[20,18,200,20],caption:"Pola Penyakit",multiSelection:false,tag:2});
		this.cb_dokter = new portalui_saiCBBL(this,{bound:[20,14,200,20],caption:"Dokter",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.e_tarif = new saiLabelEdit(this,{bound:[720,14,200,20],caption:"Tarif", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.cb_cust = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"Customer",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.e_nilai = new saiLabelEdit(this,{bound:[720,15,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_nik = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"NIKes",multiSelection:false});		
		this.e_diskon = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Diskon", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,14,503,20],caption:"Keterangan", maxLength:150});						
		this.e_ppn = new saiLabelEdit(this,{bound:[720,14,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.cb_gudang = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Gudang",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.e_total = new saiLabelEdit(this,{bound:[720,16,200,20],caption:"Total+", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new portalui_panel(this,{bound:[20,19,900,300],caption:"Item Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,280],colCount:10,tag:8,
		            colTitle:["Kode","Nama","Merk - Tipe","Satuan","Stok","Harga","Diskon","Jumlah","Bonus","SubTtl"],
					colWidth:[[0,1,2,3,4,5,6,7,8,9],[80,180,150,50,60,60,60,60,60,80]],
					readOnly:true,
					colFormat:[[4,5,6,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					nilaiChange:[this,"doNilaiChange"],
					defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,303,900,25],buttonStyle:2,grid:this.sg});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			this.cb_cust.setSQL("select kode_cust, nama from cust where kode_lokasi = '"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);
			this.cb_icdx.setSQL("select kode_icdx, nama from apo_icdx",["kode_icdx","nama"],false,["Kode","Nama"],"where","Data Pola Penyakit",true);
			this.cb_dokter.setSQL("select kode_dokter, nama from apo_dokter where kode_lokasi = '"+this.app._lokasi+"'",["kode_dokter","nama"],false,["Kode","Nama"],"and","Data Dokter",true);
			this.flagResepFree = "0";
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('OBTAPO','OBTPOLI','OBTMARGIN','OBTPDPTDOK','OBTPIUDOK','RESEPFREE','OBTPDPT','OBTHPP','HUTPPN','OBTPIU','OBTINV','OBTPOT') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					if (line.kode_spro == "HUTPPN") this.akunPPN = line.flag;								
					if (line.kode_spro == "OBTPIU") this.akunPiutang = line.flag;	
					if (line.kode_spro == "OBTPIUDOK") this.akunPiutangDok = line.flag;								
					if (line.kode_spro == "OBTINV") this.akunBarang = line.flag;			
					if (line.kode_spro == "OBTPDPT") this.akunPdpt = line.flag;			
					if (line.kode_spro == "OBTPDPTDOK") this.akunPdptDok = line.flag;			
					if (line.kode_spro == "OBTHPP") this.akunHpp = line.flag;			
					if (line.kode_spro == "OBTPOT") this.akunPot = line.flag;	
					if (line.kode_spro == "RESEPFREE") this.flagResepFree = line.flag;		
					if (line.kode_spro == "OBTMARGIN") this.margin = (parseFloat(line.value1)+100)/100;	
					if (line.kode_spro == "OBTPOLI") this.ppPoli = line.flag;	
					if (line.kode_spro == "OBTAPO") this.ppApo = line.flag;	
				}
			}						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_apotek_fJualAggE.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_apotek_fJualAggE.implement({
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);		
					this.sg.clear(1);
					this.nik_user=this.app._userLog;						
					var sql = "call sp_apo_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
					this.dbLib.execQuerySync(sql);	
				}
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
					sql.add("delete from apo_brg_jual_m where no_jual ='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from apo_brg_jual_j where no_jual ='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");					
					sql.add("delete from apo_brg_jual_d where no_jual ='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");															
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;					
		}
	},
	doChange:function(sender){	
		try {			
			if (sender == this.e_periode && this.e_periode.getText() != "") {									
				//this.e_nb.setSQL("select no_jual, keterangan from apo_brg_jual_m where modul='AGG' and no_kas ='-' and posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_jual","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
				this.e_nb.setSQL("select a.no_jual, a.keterangan from apo_brg_jual_m a left join (select distinct no_jual,kode_lokasi from apo_brg_jualbayar_d) b on a.no_jual=b.no_jual and a.kode_lokasi=b.kode_lokasi "+
							"where a.modul='AGG' and b.no_jual is null and a.posted='F' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["no_jual","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
			}
			if (sender == this.cb_cust && this.cb_cust.getText()!=""){				
				this.cb_nik.setSQL("select nikes, nama from apo_peserta where periode ='"+this.e_periode.getText()+"' and kode_cust='"+this.cb_cust.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",["nikes","nama"],false,["Nikes","Nama"],"and","Data Peserta",true);
			}			
			if (sender == this.e_nb && this.e_nb.getText()!="") {
				var strSQL = "select a.no_dokumen,a.keterangan,a.periode,a.tanggal,a.kode_cust,d.nama as nama_cust,a.kode_gudang,a.nilai,a.nilai_ppn,a.nilai_diskon,b.nama as nama_gudang,a.pasien,c.nama as nama_pasien,a.kode_icdx,a.kode_dokter,a.tarif,e.nama as nama_dokter "+
							 "from apo_brg_jual_m a inner join apo_brg_gudang b on a.kode_gudang=b.kode_gudang and a.kode_lokasi=b.kode_lokasi "+
							 "                      inner join apo_peserta c on a.pasien=c.nikes and a.kode_lokasi=c.kode_lokasi "+
							 "                      inner join cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
							 "                      inner join apo_dokter e on a.kode_dokter=e.kode_dokter and a.kode_lokasi=e.kode_lokasi "+
							 "where a.no_jual='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_diskon.onChange.set(undefined,undefined);
						this.e_ppn.onChange.set(undefined,undefined);
						this.e_tarif.onChange.set(undefined,undefined);
						this.cb_cust.onChange.set(undefined,undefined);
						this.cb_dokter.onChange.set(undefined,undefined);						
						this.perLama = line.periode;					
						this.dp_d1.setText(line.tanggal);	
						this.e_dok.setText(line.no_dokumen);						
						this.e_ket.setText(line.keterangan);
						this.cb_cust.setText(line.kode_cust,line.nama_cust);					
						this.cb_nik.setText(line.pasien,line.nama_pasien);					
						this.cb_icdx.setText(line.kode_icdx);					
						this.cb_dokter.setText(line.kode_dokter,line.nama_dokter);					
						this.cb_gudang.setText(line.kode_gudang,line.nama_gudang);					
						this.e_diskon.setText(floatToNilai(line.nilai_diskon));
						this.e_ppn.setText(floatToNilai(line.nilai_ppn));
						this.e_total.setText(floatToNilai(line.nilai));
						this.e_tarif.setText(floatToNilai(line.tarif));					
					} 
				}
				
				this.nik_user=this.app._userLog;						
				var sql = "call sp_apo_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
				this.dbLib.execQuerySync(sql);	
				
				strSQL = "select a.kode_brg,a.satuan,a.jumlah,a.bonus,a.harga,a.diskon,b.nama,b.merk+' - '+b.tipe as ket,round(a.jumlah * (a.harga-a.diskon),0) as total,c.stok+a.jumlah+a.bonus as stok "+
						 "from apo_brg_jual_d a inner join apo_brg_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
						 "                      inner join apo_brg_stok c on a.kode_brg=c.kode_brg  and a.kode_gudang=c.kode_gudang and a.kode_lokasi=c.kode_lokasi and c.nik_user='"+this.nik_user+"' "+
						 "where a.no_jual='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
							
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg.appendData([line1.kode_brg,line1.nama,line1.ket,line1.satuan,parseFloat(line1.stok),parseFloat(line1.harga),parseFloat(line1.diskon),parseFloat(line1.jumlah),parseFloat(line1.bonus),parseFloat(line1.total)]);
					}
				} else this.sg.clear(1);												
				this.sg.validasi();
				
				this.e_diskon.onChange.set(this,"doChange");
				this.e_ppn.onChange.set(this,"doChange");
				this.e_tarif.onChange.set(this,"doChange");
				this.cb_cust.onChange.set(this,"doChange");
				this.cb_dokter.onChange.set(this,"doChange");
			}
			if (sender == this.e_ppn || sender == this.e_nilai || sender == this.e_diskon || sender == this.e_tarif) {
				//if (sender == this.e_diskon && this.e_diskon.getText()!="") this.e_ppn.setText(floatToNilai(Math.round((nilaiToFloat(this.e_nilai.getText())-nilaiToFloat(this.e_diskon.getText()))*10/100)));
				if (this.e_nilai.getText()!="" && this.e_ppn.getText()!="" && this.e_diskon.getText()!="" && this.e_tarif.getText()!="") {
					this.e_total.setText(floatToNilai(nilaiToFloat(this.e_nilai.getText())-nilaiToFloat(this.e_diskon.getText())+nilaiToFloat(this.e_ppn.getText())+nilaiToFloat(this.e_tarif.getText())));
				}
			}		
			if (sender == this.cb_dokter && this.cb_dokter.getText()!="") {
				var strSQL = "select tarif from apo_dokter "+
							 "where kode_dokter ='"+this.cb_dokter.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){											
						this.e_tarif.setText(floatToNilai(line.tarif));					
					}					
				}
			}
		} catch(e) {
			alert(e);
		}
	},	
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.periodeBrg = this.e_periode.getText().substr(0,4)+"01";		
	},	
	doNilaiChange: function(){
		try{
			this.jualbruto = this.diskon = 0;
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(9,i) != ""){
					tot += nilaiToFloat(this.sg.cells(9,i));					
					this.jualbruto += Math.round(nilaiToFloat(this.sg.cells(5,i)) * nilaiToFloat(this.sg.cells(7,i)));					
					this.diskon += Math.round(nilaiToFloat(this.sg.cells(6,i)) * nilaiToFloat(this.sg.cells(7,i)));					
				}
			}
			this.e_nilai.setText(floatToNilai(tot));			
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
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (No : "+ this.e_nb.getText()+")");							
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