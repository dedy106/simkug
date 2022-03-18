window.app_kopeg_pinjbrg_transaksi_fOrderk = function(owner)
{
	if (owner)
	{
		window.app_kopeg_pinjbrg_transaksi_fOrderk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_kopeg_pinjbrg_transaksi_fOrderk";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Order Barang: Koreksi", 0);	
		
		uses("portalui_saiCBB;portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator"),uses("app_saku_fJurnalViewer",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.cb_perLama = new portalui_saiCB(this,{bound:[723,11,200,20],caption:"Periode Bukti",mustCheck: false, tag:2});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,250,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.b_gen = new portalui_button(this,{bound:[280,12,80,18],caption:"Gen",click:[this,"doClick"],icon:"icon/"+system.getThemes()+"/process.png"});		
		this.cb_nbLama = new portalui_saiCBB(this,{bound:[723,12,200,20],caption:"No Bukti Lama",readOnly:true,btnClick:[this,"doBtnClick"],btnRefreshClick:[this,"doLoadData"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,13,343,20],caption:"No Dokumen", maxLength:100, tag:1});				
		this.e_desc = new portalui_saiLabelEdit(this,{bound:[20,14,503,20],caption:"Keterangan", maxLength:150, tag:1});				
		this.cb_cust = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Nasabah",btnClick:[this,"doBtnClick"],tag:1});				
		this.cb_app = new portalui_saiCBBL(this,{bound:[20,17,200,20],caption:"Pembuat",btnClick:[this,"doBtnClick"],tag:1});				
		this.e_total = new portalui_saiLabelEdit(this,{bound:[723,17,200,20],caption:"Total",tipeText:ttNilai,readOnly:true,text:"0"});		
		
		this.p1 = new portalui_panel(this,{bound:[20,19,900,295],caption:"Item Order Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,245],colCount:7,tag:2,
		            colTitle:["Kode","Nama","Tipe","Satuan","Harga","Jumlah","SubTtl"],
					colWidth:[[0,1,2,3,4,5,6],[100,220,250,40,80,60,100]],colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[1,2,3,6],[0,4,5]],ellipsClick:[this,"doEllipseClick"],
					change:[this,"doChangeCell"],selectCell:[this,"doSelectCell"],buttonStyle:[[0],[bsEllips]],
					defaultRow:1,nilaiChange:[this, "doSgChange"],autoAppend:true});				
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,268,900,25],buttonStyle:2,grid:this.sg});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			uses("util_addOnLib");
		    this.addOnLib = new util_addOnLib();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();												
			var prd = this.dbLib.getDataProvider("select distinct periode from kop_jual_m where kode_lokasi = '"+this.app._lokasi+"' order by periode desc",true);
			if (typeof prd == "object"){						
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cb_perLama.setItem(new portalui_arrayMap({items:items}));
			}
			this.cb_perLama.setText(this.app._periode);
			
			var sql = new server_util_arrayList();
			sql.add("select kode_brg, nama ,tipe,sat,harga from kop_brg where kode_lokasi='"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};

window.app_kopeg_pinjbrg_transaksi_fOrderk.extend(window.portalui_childForm);

window.app_kopeg_pinjbrg_transaksi_fOrderk.implement({
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
			if (parseFloat(this.perLama) < parseFloat(this.app._periode)) this.e_nb.setTag("0");
			else this.e_nb.setTag("9");
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_jual_m","no_jual",this.app._lokasi+"-SO"+this.e_periode.getText().substr(2,4)+".","0000"));		
						if (this.posted === "T") var vPosted = 'F'; else var vPosted = 'X';
						sql.add(" update kop_jual_m set no_link='"+this.e_nb.getText()+"',no_del = concat(no_jual,'r') where no_jual ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_jual_m (no_jual,kode_lokasi,tanggal,no_dokumen,keterangan,kode_agg,nik_buat,nilai,periode,nik_user,tgl_input,no_link,no_del,kode_curr,progress,nilai_um,posted,kode_pp) "+
								" select concat(no_inv,'r'),kode_lokasi,'"+this.dp_d1.getDateString()+"',no_dokumen,keterangan,kode_agg,nik_buat,nilai,'"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'-',no_jual,kode_curr,'X',nilai_um,'"+vPosted+"',kode_pp "+
								" from kop_jual_m where no_jual = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into kop_jual_d (no_jual,kode_lokasi,nu,kode_brg,harga,jumlah,modul,dc,periode,status,kode_vendor,no_spb,harga_kont,jumlah_kont)"+
								" select concat(no_jual,'r'),kode_lokasi,nu,kode_brg,harga,jumlah,modul,'C','"+this.e_periode.getText()+"',status,kode_vendor,no_spb,0,0 "+ 
								" from kop_jual_d where no_jual = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						this.nb = this.e_nb.getText();
					}
					else{
						sql.add("delete from kop_jual_m where no_jual='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_jual_d where no_jual='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");									
						this.nb = this.cb_nbLama.getText();
					}
					
					var fPosted = 'X';			
					sql.add("insert into kop_jual_m(no_jual,kode_lokasi,tanggal,no_dokumen,keterangan,kode_agg,nik_buat,nilai,periode,nik_user,tgl_input,no_link,no_del,kode_curr,progress,nilai_um,posted,kode_pp) values" +
						    "('"+this.nb+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_desc.getText()+"','"+this.cb_cust.getText()+"','"+
							this.cb_app.getText()+"',"+parseNilai(this.e_total.getText())+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'-','-','IDR','0',0,'"+fPosted+"','"+this.app._kodePP+"')");
					
					if (this.sg.getRowValidCount() > 0){
						var d="insert into kop_jual_d (no_jual,kode_lokasi,nu,kode_brg,harga,jumlah,modul,dc,periode,status,kode_vendor,no_spb,harga_kont,jumlah_kont,no_pbrg) values ";
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (i > 0) d+= ",";
								d += "('"+this.nb+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(4,i))+","+
								          parseNilai(this.sg.cells(5,i))+",'ORDER','D','"+this.e_periode.getText()+"','0','-','-',0,0,'-')";
							}
						}						
						sql.add(d);
					}
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
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(0,j) == this.sg.cells(0,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data barang untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}
				if (nilaiToFloat(this.e_total.getText()) == 0){
					system.alert(this,"Transaksi tidak valid.","Nilai Order tidak boleh nol.");
					return false;
				}
				if (parseFloat(this.perLama) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode bukti lama.");
					return false;
				}				
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
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
				if ((this.posted == "T") && (parseFloat(this.perLama) >= parseFloat(this.app._periode))) {
					system.alert(this,"Transaksi sudah posting.","Lakukan unposting dahulu.");
					return false;
				}
				try{
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (parseFloat(this.perLama) < parseFloat(this.app._periode)) {
						if (this.posted === "T") var vPosted = 'F'; else var vPosted = 'X';
						sql.add(" update kop_jual_m set no_del = concat(no_jual,'r') where no_jual ='"+this.cb_nbLama.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						sql.add(" insert into kop_jual_m (no_jual,kode_lokasi,tanggal,no_dokumen,keterangan,kode_agg,nik_buat,nilai,periode,nik_user,tgl_input,no_link,no_del,kode_curr,progress,nilai_um,posted,kode_pp) "+
								" select concat(no_inv,'r'),kode_lokasi,'"+this.dp_d1.getDateString()+"',no_dokumen,keterangan,kode_agg,nik_buat,nilai,'"+this.e_periode.getText()+"','"+this.app._userLog+"',now(),'-',no_jual,kode_curr,'X',nilai_um,'"+vPosted+"',kode_pp "+
								" from kop_jual_m where no_jual = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
						sql.add(" insert into kop_jual_d (no_jual,kode_lokasi,nu,kode_brg,harga,jumlah,modul,dc,periode,status,kode_vendor,no_spb,harga_kont,jumlah_kont)"+
								" select concat(no_jual,'r'),kode_lokasi,nu,kode_brg,harga,jumlah,modul,'C','"+this.e_periode.getText()+"',status,kode_vendor,no_spb,0,0 "+ 
								" from kop_jual_d where no_jual = '"+this.cb_nbLama.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					}
					else{
						sql.add("delete from kop_jual_m where no_jual='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kop_jual_d where no_jual='"+this.cb_nbLama.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");									
					}
					this.dbLib.execArraySQL(sql);
				}catch(e){
					systemAPI.alert(e);
				}
				break;	
		}
	},
	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_jual_m","no_jual",this.app._lokasi+"-SO"+this.e_periode.getText().substr(2,4)+".","0000"));		
		    this.e_dok.setFocus();
	},
	doLoadData:function(sender){
		try{			
			if (this.cb_nbLama.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.kode_brg,b.nama as nama_brg,b.tipe,b.sat,a.harga,a.jumlah,a.harga*a.jumlah as subttl,"+
													  "       c.tanggal,c.keterangan,c.no_dokumen,c.kode_agg,d.nama as nama_agg,c.nik_buat,e.nama as nama_buat,c.nilai_um,c.periode,c.posted,c.progress_um "+
				                                      "from kop_jual_d a inner join kop_brg b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
													  "                  inner join kop_jual_m c on a.no_jual=c.no_jual and a.kode_lokasi=c.kode_lokasi "+
													  "                  inner join kop_agg d on c.kode_agg=d.kode_agg and c.kode_lokasi=d.kode_lokasi "+
													  "                  inner join karyawan e on c.nik_buat=e.nik and c.kode_lokasi=e.kode_lokasi "+
													  "where c.no_jual='"+this.cb_nbLama.getText()+"' and c.kode_lokasi = '"+this.app._lokasi+"'");
				
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line;
					var stsSPB = false;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_brg,line.nama_brg,line.tipe,line.sat,floatToNilai(line.harga),floatToNilai(line.jumlah),floatToNilai(line.subttl)]);
					}
					this.sg.validasi();
					this.dp_d1.setText(line.tanggal);
					this.e_periode.setText(line.periode);
					this.perLama = line.periode;
					this.posted = line.posted;
					this.progressUM = line.progress_um;
					this.e_desc.setText(line.keterangan);
					this.e_dok.setText(line.no_dokumen);
					this.cb_app.setText(line.nik_buat, line.nama_buat);
					this.cb_cust.setText(line.kode_agg, line.nama_agg);
				}
			}
			else {
				system.alert(this,"Bukti Lama tidak valid.","Bukti Lama harus dipilih.");
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_nbLama) {   
			    this.standarLib.showListData(this, "Daftar Bukti Order",sender,undefined, 
											  "select no_jual,keterangan from kop_jual_m where progress='0' and kode_lokasi= '"+this.app._lokasi+"' and no_del='-'", 
											  "select count(no_jual)     from kop_jual_m where progress='0' and kode_lokasi= '"+this.app._lokasi+"' and no_del='-'", 
											  ["no_jual","keterangan"],"and",["No Bukti","Deskripsi"],false);				
				this.standarLib.clearByTag(this, new Array("1"),undefined);		
				this.sg.clear(1);
			}
			if (sender == this.cb_cust) {   
			    this.standarLib.showListData(this, "Daftar Nasabah",sender,undefined, 
											  "select kode_agg, nama  from kop_agg where kode_lokasi ='"+this.app._lokasi+"'",
											  "select count(kode_agg) from kop_agg where kode_lokasi ='"+this.app._lokasi+"'",
										      ["kode_agg","nama"],"and",["Kode Nasabah","Nama"],false);
			}
			if (sender == this.cb_app) {   
			    this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi='"+this.app._lokasi+"'",
											  ["nik","nama"],"and",["NIK","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doEllipseClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Item Barang",sender,undefined, 
												  "select a.kode_brg, a.nama, a.tipe, a.sat, a.harga "+
												  "from kop_brg a "+
												  "where a.kode_lokasi='"+this.app._lokasi+"'",
												  "select count(kode_brg) from kop_brg where kode_lokasi='"+this.app._lokasi+"' ",
												  ["kode_brg","nama","tipe","sat","harga"],"and",["Kode","Nama","Tipe","Satuan","Harga"],false);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (sender == this.sg) {
			sender.onChange.set(undefined,undefined);
			if (col == 0) {
				var brg = this.dataBrg.get(sender.cells(0,row));
				if(brg) {
					sender.cells(1,row,brg.nama);
					sender.cells(2,row,brg.tipe);
					sender.cells(3,row,brg.sat);
					sender.cells(4,row,floatToNilai(brg.harga));
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Barang "+sender.cells(0,row)+" tidak ditemukan","Coba kode yang lainnya.","");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.cells(2,row,"");
					sender.cells(3,row,"");
					sender.cells(4,row,"0");
				}
			}
			sender.onChange.set(this,"doChangeCell");
			if ((col == 4) || (col == 5)){
				if ((this.sg.getCell(4,row) != "") && (this.sg.getCell(5,row) != "")) {
					var subttl = (nilaiToFloat(this.sg.getCell(4,row)) * nilaiToFloat(this.sg.getCell(5,row)));
					this.sg.setCell(6,row,floatToNilai(subttl));
				}
				this.sg.validasi();
			}
		}
	},
	doSelectCell: function(sender, col, row){
		if (sender == this.sg) {
			if ((col == 5) && (this.sg.getCell(5,row) == "")){
				this.sg.setCell(5,row,"0");
			}
			if ((col == 6) && (this.sg.getCell(6,row) == "")){
				this.sg.setCell(6,row,"0");
			}
		}
	},
	doSgChange: function(sender, col, row){		
		var tot = 0;			
		for (var i = 0;i < this.sg.getRowCount();i++){
			if (this.sg.cells(6,i) != "")
				tot += nilaiToFloat(this.sg.cells(6,i));
		}	
		this.e_total.setText(floatToNilai(tot));
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.nb+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
					eval("result = "+result+";");
					if (typeof result != "string"){
						this.dataBrg = new portalui_arrayMap();
						if (result.result[0]){	    			        
							var line;
							for (var i in result.result[0].rs.rows){
								line = result.result[0].rs.rows[i];
								this.dataBrg.set(line.kode_brg, line.nama);
							}
						}
					}else throw result;
	    		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
