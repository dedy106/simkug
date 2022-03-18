window.app_sc_transaksi_fOrder = function(owner)
{
	if (owner)
	{
		window.app_sc_transaksi_fOrder.prototype.parent.constructor.call(this,owner);
		this.className  = "app_sc_transaksi_fOrder";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Purchase Order: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;tinymceCtrl");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No PO",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_buat = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.cb_vendor = new saiCBBL(this,{bound:[20,17,200,20],caption:"Vendor", multiSelection:false, maxLength:10, tag:2});				
		this.e_total = new saiLabelEdit(this,{bound:[800,17,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.cb_jenis = new saiCBBL(this,{bound:[20,16,200,20],caption:"Jenis Barang", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.bTampil = new button(this,{bound:[670,16,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.i_appAll = new portalui_imageButton(this,{bound:[760,16,20,20],hint:"Approve All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ppn = new saiLabelEdit(this,{bound:[800,16,200,20],caption:"PPN", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,12,980,347], childPage:["Data Pesanan","Catatan Vendor"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:15,tag:0,
		            colTitle:["Status","No Pesan","Tanggal","Keterangan","PP","Pengaju","Kode Barang","Nama Barang","Spesifikasi","Satuan","Harga","Jumlah","Total","Due Date","Jam"],
					colWidth:[[14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[60,80,80,70,70,70,150,100,80,100,100,150,80,100,80]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],[]],
					colFormat:[[10,11,12],[cfNilai,cfNilai,cfNilai]],buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["ORDER","INPROG"]})]],
					change:[this,"doChangeCells"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});			
		this.mCatatan = new tinymceCtrl(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-25], withForm:false});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
					
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			this.cb_buat.setSQL("select nik, nama from sc_karyawan",["nik","nama"],false,["NIK","Nama"],"where","Data Karyawan",true);												
			this.cb_vendor.setSQL("select kode_vendor, nama from sc_vendor",["kode_vendor","nama"],false,["Kode","Nama"],"where","Data Vendor",true);												
			this.cb_jenis.setSQL("select kode_jenis, nama from sc_jenis",["kode_jenis","nama"],false,["Kode","Nama"],"where","Data Jenis Barang",true);												
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_sc_transaksi_fOrder.extend(window.childForm);
window.app_sc_transaksi_fOrder.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sc_po_m","no_po",this.app._lokasi+"-PO"+this.e_periode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();						
					sql.add("insert into sc_po_m(no_po,tanggal,periode,keterangan,nik_buat,kode_vendor,kode_jenis,nilai,ppn,nik_user,tgl_input,catatan,no_bast,no_rekon,no_jurnal) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_vendor.getText()+"','"+this.cb_jenis.getText()+"',"+parseNilai(this.e_total.getText())+","+parseNilai(this.e_ppn.getText())+",'"+this.app._userLog+"',getdate(),'"+urlencode(this.mCatatan.getCode())+"','-','-','-')");
					
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];						
						if (line.status.toUpperCase() == "ORDER") 
								sql.add("update sc_pesan_d set no_po='"+this.e_nb.getText()+"',kode_vendor='"+this.cb_vendor.getText()+"' where kode_brg='"+line.kode_brg+"' and no_pesan='"+line.no_pesan+"' and kode_brg='"+line.kode_brg+"'");
					}				
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
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				var isAda = false;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					if (this.dataJU.rs.rows[i].status == "ORDER") isAda = true;
				}
				if (!isAda){
					system.alert(this,"Transaksi tidak valid.","Tidak ada transaksi dengan status ORDER.");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sc_po_m","no_po",this.app._lokasi+"-PO"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}
		if (sender == this.i_appAll) {		
			var line; var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].status = "ORDER";
				line = this.dataJU.rs.rows[i];				
				tot += parseFloat(line.total);
			}
			this.e_total.setText(floatToNilai(tot));
			this.doTampilData(this.page);
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode || sender == this.cb_jenis) {
			this.dataJU.rs.rows = [];
			this.sg.clear(1); 
		}		
		if (sender == this.e_total && this.e_total.getText()!="") {
			var ppn = Math.round(10/100 * nilaiToFloat(this.e_total.getText()));
			this.e_ppn.setText(floatToNilai(ppn));
		}
	},
	doLoad:function(sender){
		var strSQL = "select 'INPROG' as status,a.no_pesan,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.kode_cc+' - '+b.nama as cc,a.nik_buat+' - '+c.nama as pengaju, "+
					 " d.kode_brg,e.nama as nama_brg,e.tipe,e.satuan,d.harga,d.jumlah,(d.harga*d.jumlah) as total,convert(varchar,d.due_date,103) as due_date,d.jam "+
					 "from sc_pesan_m a inner join sc_cc b on a.kode_cc=b.kode_cc "+
					 " 			        inner join sc_karyawan c on a.nik_buat=c.nik "+					 
					 "                  inner join sc_pesan_d d on a.no_pesan=d.no_pesan "+
					 "                  inner join sc_barang e on d.kode_brg=e.kode_brg "+
					 "where e.kode_jenis='"+this.cb_jenis.getText()+"' and a.progress='1' and a.periode<='"+this.e_periode.getText()+"' and d.no_po='-' ";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);		
	},
	doTampilData: function(page) {
		this.sg.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.status.toUpperCase(),line.no_pesan,line.tanggal,line.keterangan,line.cc,line.pengaju,line.kode_brg,line.nama_brg,line.tipe,line.satuan,floatToNilai(line.harga),floatToNilai(line.jumlah),floatToNilai(line.total),line.due_date,line.jam]);
		}
		this.sg.setNoUrut(start);
	},
	doChangeCells: function(sender, col , row) {
		if (col == 0 ) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);						
			var line; var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				if (line.status.toUpperCase() == "ORDER"){
					tot += parseFloat(line.total);
				}						
			}
			this.e_total.setText(floatToNilai(tot));
		}		
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
