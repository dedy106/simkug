window.app_saku2_transaksi_kopeg_bengkel_fAppGudangE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_bengkel_fAppGudangE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_bengkel_fAppGudangE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval Gudang: Edit", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		
		this.pc1 = new pageControl(this,{bound:[20,18,980,480], childPage:["Detail SPK"]});										
		this.c_status = new saiCB(this.pc1.childPage[0],{bound:[20,10,202,20],caption:"Status Approval",items:["APPROVE","REVISI"], readOnly:true,tag:2});		
		this.e_nospk = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,202,20],caption:"No SPK", readOnly:true});						
		this.e_jenis = new saiLabelEdit(this.pc1.childPage[0],{bound:[268,13,202,20],caption:"Jenis", readOnly:true});						
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,13,450,20],caption:"Tanggal", readOnly:true});										
		this.e_nopol = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,450,20],caption:"No Polisi", readOnly:true});						
		this.e_merk = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,14,450,20],caption:"Merk KBM - Tahun", readOnly:true});								
		this.e_tipe = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,450,20],caption:"Tipe - Merk", readOnly:true});								
		this.e_user = new saiLabelEdit(this.pc1.childPage[0],{bound:[520,16,450,20],caption:"Customer", readOnly:true});										
		this.e_memo = new saiMemo(this.pc1.childPage[0],{bound:[20,12,450,50],caption:"Catatan Gudang",tag:9,readOnly:true});
		this.e_keluhan = new saiMemo(this.pc1.childPage[0],{bound:[520,12,450,50],caption:"Keluhan",tag:9});		
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,20,this.pc1.width-10,this.pc1.height-195],colCount:7,tag:9,
		            colTitle:["Kode","Nama","No Barang","Tipe","Satuan","Jumlah","Jenis"],					
					colWidth:[[6,5,4,3,2,1,0],[50,80,80,150,160,300,100]],					
					colFormat:[[5],[cfNilai]],					
					defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
	
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
					
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			var data = this.dbLib.getDataProvider("select kode_gudang from fri_petugas where nik ='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.kodeGudang = line.kode_gudang;
				} 				
			}
			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.e_keluhan.setReadOnly(true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_bengkel_fAppGudangE.extend(window.childForm);
window.app_saku2_transaksi_kopeg_bengkel_fAppGudangE.implement({
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
					sql.add("delete from ver_m where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ver_d where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("update fri_spk_m set progress='0',no_bengkel='-' where no_spk='"+this.e_nospk.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					if (this.c_status.getText()=="APPROVE")  var prog = "1";
					if (this.c_status.getText()=="REVISI")  var prog = "R";
					
					sql.add("update a set no_verseb ='"+this.e_nb.getText()+"' "+
					        "from ver_m a inner join ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi and a.no_verseb='-' "+
							"where b.no_bukti ='"+this.e_nospk.getText()+"' and b.modul='BENGKEL' and b.kode_lokasi='"+this.app._lokasi+"'");
							
					sql.add("update fri_spk_m set progress='"+prog+"',no_bengkel='"+this.e_nb.getText()+"' where no_spk='"+this.e_nospk.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into ver_m (no_ver,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_verseb) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','BENGKEL','-')");
					
					sql.add("insert into ver_d (no_ver,status,modul,no_bukti,kode_lokasi,catatan) values "+
						    "('"+this.e_nb.getText()+"','"+prog+"','BENGKEL','"+this.e_nospk.getText()+"','"+this.app._lokasi+"','"+this.e_memo.getText()+"')");
							
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
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					this.e_memo.setText("-"); this.e_keluhan.setText("-");
					this.sg1.clear(1);
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :									
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :					
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();								
				sql.add("delete from ver_m where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from ver_d where no_ver='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("update fri_spk_m set progress='0',no_bengkel='-' where no_spk='"+this.e_nospk.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
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
		if (sender == this.e_periode && this.e_periode.getText() != "") {										 
			this.e_nb.setSQL("select b.no_ver, b.no_bukti from ver_d b inner join fri_spk_m a on a.no_spk=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.modul='BENGKEL' "+
							 "       inner join ver_m c on b.no_ver=c.no_ver and a.kode_lokasi=c.kode_lokasi and c.no_verseb='-' "+
			                 "where  a.kode_gudang='"+this.kodeGudang+"' and c.status in ('APPROVE','REVISI') and a.progress in ('1','R') and c.periode='"+this.e_periode.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",["b.no_ver","b.no_bukti"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
		}
		if (sender == this.e_nb && this.e_nb.getText()!="") {					
			var strSQL = "select a.tanggal as tgl,b.catatan,case c.progress when '1' then 'APPROVE' when 'R' then 'REVISI' end as progress, "+
						 "c.no_spk,convert(varchar,c.tanggal,103) as tanggal,c.jenis,c.no_polisi,c.merk+' - '+c.tahun as merk,c.tipe,c.cust,c.keluhan "+ 
						 "from ver_m a inner join ver_d b on a.no_ver=b.no_ver and a.kode_lokasi=b.kode_lokasi "+
						 "             inner join fri_spk_m c on b.no_bukti=c.no_spk and b.kode_lokasi=c.kode_lokasi "+						 
						 "where a.no_ver='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){															
					this.dp_d1.setText(line.tgl);										
					this.c_status.setText(line.progress.toUpperCase());					
					this.e_nospk.setText(line.no_spk);
					this.e_jenis.setText(line.jenis);
					this.e_tgl.setText(line.tgl);
					this.e_nopol.setText(line.no_polisi);
					this.e_merk.setText(line.merk);
					this.e_tipe.setText(line.tipe);
					this.e_user.setText(line.cust);
					this.e_memo.setText(line.catatan);
					this.e_keluhan.setText(line.keluhan);					
				} 
			}

			var strSQL = "select 'INV' as jenis,b.kode_brg,b.nama+' - '+c.nama+' - '+d.nama as nama,b.no_brg,b.tipe,b.satuan,a.jumlah "+
			             "from fri_spk_d a inner join fri_barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
						 "                 inner join fri_barang_jenis c on b.kode_jenis=c.kode_jenis and b.kode_lokasi=c.kode_lokasi "+
						 "                 inner join fri_barang_kbm d on b.kode_kbm=d.kode_kbm and b.kode_lokasi=d.kode_lokasi "+
						 "where a.no_spk='"+this.e_nospk.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						 "union all "+
						 "select 'NON' as jenis,'-' as kode_brg,item as nama,'-' as merk,'-' as tipe,satuan,jumlah from fri_spknon_d where no_spk='"+this.e_nospk.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						 "order by jenis";							
			var data1 = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg1.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];							
					this.sg1.appendData([line1.kode_brg,line1.nama,line1.no_brg,line1.tipe,line1.satuan,floatToNilai(line1.jumlah),line1.jenis.toUpperCase()]);
				}
			}
			this.sg1.validasi();
		}
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