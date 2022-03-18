window.app_frigia_transaksi_fKeluarE = function(owner)
{
	if (owner)
	{
		window.app_frigia_transaksi_fKeluarE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_frigia_transaksi_fKeluarE";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Barang Keluar: Hapus", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:1,change:[this,"doChange"]});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,13,343,20],caption:"No Dok / BPB", maxLength:100});				
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,14,503,20],caption:"Keterangan", maxLength:150});				
		this.cb_gudang = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Gudang",multiSelection:false,tag:1,change:[this,"doChange"]});
		
		this.p1 = new portalui_panel(this,{bound:[20,19,990,330],caption:"Item Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,985,280],colCount:10,tag:2,
		            colTitle:["Kode","Nama","Kelompok - Jenis - KBM - Tipe","Satuan","Stok","Jumlah","Kode Gudang","Nama Gudang","Kode Cust","Nama Cust"],
					colWidth:[[0,1,2,3,4,5,6,7,8,9],[100,180,290,50,80,80,80,100,80,100]],
					colFormat:[[4,5],[cfNilai,cfNilai]],
					ellipsClick:[this,"doEllipseClick"],columnReadOnly:[true,[0,1,2,3,4,6,7],[5]],change:[this,"doChangeCell"],
					buttonStyle:[[0,6,8],[bsEllips,bsEllips,bsEllips]], defaultRow:1,autoAppend:true});
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
			this.cb_gudang.setSQL("select kode_gudang, nama from fri_barang_gudang where kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_frigia_transaksi_fKeluarE.extend(window.portalui_childForm);
window.app_frigia_transaksi_fKeluarE.implement({
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
			case "simpan" :	
			    
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
					sql.add("delete from fri_keluar_m where no_keluar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from fri_keluar_d where no_keluar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from fri_barang_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='KELUAR'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},	
	doChange:function(sender){		
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.e_nb.setSQL("select no_keluar, keterangan from fri_keluar_m where periode='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["no_keluar","keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti Keluar",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider(
			           "select a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.periode,a.keterangan,a.kode_gudang,b.nama as nama_gudang "+
					   "from fri_keluar_m a "+
			           "	 inner join fri_barang_gudang b on a.kode_gudang=b.kode_gudang and a.kode_lokasi=b.kode_lokasi "+			           					   
					   "where a.no_keluar='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);					
					this.e_dok.setText(line.no_dokumen);
					this.e_desc.setText(line.keterangan);
					this.cb_gudang.setText(line.kode_gudang,line.nama_gudang);					
				} 
			}
			var data = this.dbLib.getDataProvider(
						"select a.kode_brg,c.nama, d.nama+' - '+e.nama+' - '+f.nama+' - '+c.tipe as keterangan,c.satuan,a.stok,a.jumlah,a.kode_gudang2,isnull(b.nama,'-') as nama_gudang,a.kode_cust,isnull(g.nama,'-') as nama_cust "+
						"from fri_keluar_d a "+
						"       inner join fri_barang_m c on a.kode_brg=c.kode_brg and a.kode_lokasi=c.kode_lokasi "+
						" 	    inner join fri_barang_klp d on c.kode_klp=d.kode_klp and c.kode_lokasi=d.kode_lokasi "+
						"       inner join fri_barang_jenis e on c.kode_jenis=e.kode_jenis and c.kode_lokasi=e.kode_lokasi "+
						"       inner join fri_barang_kbm f on c.kode_kbm=f.kode_kbm and c.kode_lokasi=f.kode_lokasi "+
						" 	    left join fri_barang_gudang b on a.kode_gudang2=b.kode_gudang and a.kode_lokasi=b.kode_lokasi "+
						" 	    left join cust g on a.kode_cust=g.kode_cust and a.kode_lokasi=g.kode_lokasi "+
						"where a.no_keluar = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_brg,line.nama,line.keterangan,line.satuan,floatToNilai(line.stok),floatToNilai(line.jumlah),line.kode_gudang2,line.nama_gudang,line.kode_cust,line.nama_cust]);
				}
			} else this.sg.clear(1);			
		}
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (No : "+ this.e_nb.getText()+")");							
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