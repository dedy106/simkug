/*

stok mesti dicek,,jadi hapus saja itupun jika stok masih tersedia melebhi jumlah batalnya pembelian

*/

window.app_saku2_transaksi_kopeg_barang_fBeliE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_barang_fBeliE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_barang_fBeliE";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pembatalan Pembelian Barang: Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2,change:[this,"doChange"]});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,13,225,20],caption:"No Dokumen", maxLength:100});				
		this.e_nilai = new saiLabelEdit(this,{bound:[720,13,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,14,503,20],caption:"Keterangan", maxLength:150});				
		this.e_diskon = new saiLabelEdit(this,{bound:[720,14,200,20],caption:"Diskon", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.cb_vendor = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"Vendor",multiSelection:false,tag:1});
		this.e_ppn = new saiLabelEdit(this,{bound:[720,15,200,20],caption:"Nilai PPN", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_gudang = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Gudang",multiSelection:false,tag:1});
		this.e_total = new saiLabelEdit(this,{bound:[720,16,200,20],caption:"Total+", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new portalui_panel(this,{bound:[20,19,900,330],caption:"Item Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,280],colCount:10,tag:2,
		            colTitle:["Kode","Nama","Merk - Tipe","Satuan","Harga","Diskon","Jumlah","Bonus","SubTtl","Stok"],
					colWidth:[[0,1,2,3,4,5,6,7,8,9],[80,190,200,50,60,60,60,60,80,60]],
					colFormat:[[4,5,6,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					readOnly:true,nilaiChange:[this,"doNilaiChange"],defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,303,900,25],buttonStyle:3,grid:this.sg});
		
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
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_barang_fBeliE.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_barang_fBeliE.implement({	
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);		
					this.sg.clear(1);
					setTipeButton(tbHapus);
				}
				break;			
			case "hapus" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					this.nik_user=this.app._userLog;						
					var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
					this.dbLib.execQuerySync(sql);	
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								var data = this.dbLib.getDataProvider("select stok from brg_stok where kode_brg='"+this.sg.cells(0,i)+"'  and kode_gudang='"+this.cb_gudang.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nik_user='"+this.nik_user+"'",true);
								if (typeof data == "object"){
									var line = data.rs.rows[0]; 
									if (line != undefined) this.sg.cells(9,i,floatToNilai(line.stok));
								}
								var j = i+1;
								if (nilaiToFloat(this.sg.cells(5,i))+nilaiToFloat(this.sg.cells(6,i)) > nilaiToFloat(this.sg.cells(9,i))) {
									system.alert(this,"Jumlah+Bonus melebihi Stok.","Baris "+j+" ");
									return false;
								}
							}
						}						
					}					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from brg_beli_m where no_beli ='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from brg_beli_j where no_beli ='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");					
					sql.add("delete from brg_beli_d where no_beli ='"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");															
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
		this.periodeBrg = this.e_periode.getText().substr(0,4)+"01";		
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(8,i) != ""){
					tot += nilaiToFloat(this.sg.cells(8,i));
				}
			}
			this.e_nilai.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText() != "") {						
			this.e_nb.setSQL("select no_beli, keterangan from brg_beli_m where no_kas ='-' and posted='F' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_beli","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
		}		
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var strSQL = "select no_dokumen,keterangan,periode,tanggal,kode_vendor,kode_gudang,nilai,nilai_ppn,nilai_diskon "+
			             "from brg_beli_m where no_beli='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;					
					this.dp_d1.setText(line.tanggal);	
					this.e_dok.setText(line.no_dokumen);
					this.e_ket.setText(line.keterangan);
					this.cb_vendor.setText(line.kode_vendor);					
					this.cb_gudang.setText(line.kode_gudang);					
					this.e_diskon.setText(floatToNilai(line.nilai_diskon));
					this.e_ppn.setText(floatToNilai(line.nilai_ppn));
					this.e_total.setText(floatToNilai(line.nilai));
				} 
			}
			
			this.nik_user=this.app._userLog;						
			var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);	
			
			strSQL = "select a.kode_brg,a.satuan,a.jumlah,a.bonus,a.harga,a.diskon,b.nama,b.merk+' - '+b.tipe as ket,round(a.jumlah * (a.harga-a.diskon),0) as total,c.stok "+
			         "from brg_beli_d a inner join brg_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
					 "                  inner join brg_stok c on a.kode_brg=c.kode_brg  and a.kode_gudang=c.kode_gudang and a.kode_lokasi=c.kode_lokasi and c.nik_user='"+this.nik_user+"' "+
					 "where a.no_beli='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
						
			var data1 = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];																													
					this.sg.appendData([line1.kode_brg,line1.nama,line1.ket,line1.satuan,parseFloat(line1.harga),parseFloat(line1.diskon),parseFloat(line1.jumlah),parseFloat(line1.bonus),parseFloat(line1.total),parseFloat(line1.stok)]);
				}
			} else this.sg.clear(1);												
			this.sg.validasi();
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