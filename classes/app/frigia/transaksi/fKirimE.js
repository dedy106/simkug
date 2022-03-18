window.app_frigia_transaksi_fKirimE = function(owner)
{
	if (owner)
	{
		window.app_frigia_transaksi_fKirimE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_frigia_transaksi_fKirimE";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kirim Barang: Batal", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:1,change:[this,"doChange"]});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:0, readOnly:true,change:[this,"doChange2"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,13,343,20],caption:"No Dok / BPB", maxLength:100});				
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,14,503,20],caption:"Keterangan", maxLength:150});				
		this.cb_asal = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Gudang Asal",multiSelection:false,tag:1});
		this.cb_tujuan = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Gudang Tujuan",multiSelection:false,tag:1});
		
		this.p1 = new portalui_panel(this,{bound:[20,19,990,330],caption:"Item Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,985,280],colCount:6,tag:2,
		            colTitle:["Kode","Nama","Kelompok - Jenis - KBM - Tipe","Satuan","Stok","Jumlah"],
					colWidth:[[0,1,2,3,4,5],[100,280,300,50,80,80]],
					colFormat:[[4,5],[cfNilai,cfNilai]],
					ellipsClick:[this,"doEllipseClick"],columnReadOnly:[true,[1,2,3,4],[0,5]],change:[this,"doChangeCell"],
					buttonStyle:[[0],[bsEllips]], defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,302,989,25],buttonStyle:2,grid:this.sg});
		
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
			this.cb_asal.setSQL("select kode_gudang, nama from fri_barang_gudang where kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
			this.cb_tujuan.setSQL("select kode_gudang, nama from fri_barang_gudang where kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_frigia_transaksi_fKirimE.extend(window.portalui_childForm);
window.app_frigia_transaksi_fKirimE.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
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
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);		
					this.sg.clear(1);
				}
				break;
			case "ubah" :	
			    for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						if (nilaiToFloat(this.sg.cells(4,i)) < nilaiToFloat(this.sg.cells(5,i))) {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Jumlah melebihi Stok ["+k+"]");
							return false;						
						}
						for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(0,j) == this.sg.cells(0,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data barang untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					systemAPI.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						systemAPI.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from fri_kirim_m where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from fri_kirim_d where no_kirim = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from fri_barang_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='KIRIM'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},	
	doChange:function(sender){		
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.e_nb.setSQL("select no_kirim, keterangan from fri_kirim_m where no_terima ='-' and periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_kirim","keterangan"],false,["No Bukti","keterangan"],"and","Daftar Bukti Kirim",true);			
		}				
	},
	doChange2:function(sender){		
		var data = this.dbLib.getDataProvider(
				   "select a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.periode,a.keterangan,a.kode_asal,b.nama as nama_asal,a.kode_tujuan,c.nama as nama_tujuan "+
				   "from fri_kirim_m a "+
				   "	 inner join fri_barang_gudang b on a.kode_asal=b.kode_gudang and a.kode_lokasi=b.kode_lokasi "+			           					   
				   "	 inner join fri_barang_gudang c on a.kode_tujuan=c.kode_gudang and a.kode_lokasi=c.kode_lokasi "+			           					   
				   "where a.no_kirim='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){
				this.perLama = line.periode;					
				this.dp_d1.setText(line.tanggal);					
				this.e_dok.setText(line.no_dokumen);
				this.e_desc.setText(line.keterangan);
				this.cb_asal.setText(line.kode_asal,line.nama_asal);										
				this.cb_tujuan.setText(line.kode_tujuan,line.nama_tujuan);										
			} 
		}
		var data = this.dbLib.getDataProvider(
						"select a.kode_brg,c.nama, d.nama+' - '+e.nama+' - '+f.nama+' - '+c.tipe as keterangan,c.satuan,isnull(g.stok,0) as stok,a.jumlah "+
						"from fri_kirim_d a "+
						"       inner join fri_barang_m c on a.kode_brg=c.kode_brg and a.kode_lokasi=c.kode_lokasi "+
						" 	    inner join fri_barang_klp d on c.kode_klp=d.kode_klp and c.kode_lokasi=d.kode_lokasi "+
						"       inner join fri_barang_jenis e on c.kode_jenis=e.kode_jenis and c.kode_lokasi=e.kode_lokasi "+
						"       inner join fri_barang_kbm f on c.kode_kbm=f.kode_kbm and c.kode_lokasi=f.kode_lokasi "+						
						"       left join (select kode_brg,kode_lokasi,sum(case dc when 'D' then jumlah+bonus else -(jumlah+bonus) end) as stok "+
						"                   from fri_barang_d where no_bukti <> '"+this.e_nb.getText()+"' and kode_gudang='"+this.cb_asal.getText()+"' and kode_lokasi='"+this.app._lokasi+"' group by kode_lokasi,kode_brg ) g on a.kode_brg=g.kode_brg and a.kode_lokasi=g.kode_lokasi "+
						"where a.no_kirim = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_brg,line.nama,line.keterangan,line.satuan,floatToNilai(line.stok),floatToNilai(line.jumlah)]);
				}
			} else this.sg.clear(1);		
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.e_nb.getText()+")");							
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