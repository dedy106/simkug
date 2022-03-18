window.app_sc_transaksi_fOrderRekon = function(owner)
{
	if (owner)
	{
		window.app_sc_transaksi_fOrderRekon.prototype.parent.constructor.call(this,owner);
		this.className  = "app_sc_transaksi_fOrderRekon";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Rekonsiliasi PO: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});						
		this.cb_vendor = new saiCBBL(this,{bound:[20,15,200,20],caption:"Vendor", multiSelection:false, maxLength:10});
		this.e_total = new saiLabelEdit(this,{bound:[800,15,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new button(this,{bound:[670,15,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.i_appAll = new portalui_imageButton(this,{bound:[760,15,20,20],hint:"Approve All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,980,347], childPage:["Data PO","Detail PO"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:11,tag:0,		            
					colTitle:["Status","No PO","Keterangan","Tanggal","Pembuat","Jenis Barang","Nilai","PPN","Total","No BAST","Tgl BAST"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[70,100,80,80,80,100,150,70,200,100,80]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10],[]],
					colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["REKON","BELUM"]})]],
					change:[this,"doChangeCells"],dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:14,tag:9,
		            colTitle:["No Pesan","Cost Center","Kode Barang","Nama Barang","Spesifikasi","Satuan","Harga","Jumlah","Total","Due Date","Jam","No Terima","Tgl Terima","Jam Terima"],
					colWidth:[[13,12,11,10,9,8,7,6,5,4,3,2,1,0],[60,80,100,60,80,80,80,80,60,250,150,80,150,100]],					
					readOnly:true,					
					colFormat:[[6,7,8],[cfNilai,cfNilai,cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		
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
						
			this.cb_vendor.setSQL("select kode_vendor, nama from sc_vendor",["kode_vendor","nama"],false,["Kode","Nama"],"where","Data Vendor",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_sc_transaksi_fOrderRekon.extend(window.childForm);
window.app_sc_transaksi_fOrderRekon.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sc_rekon_m","no_rekon",this.app._lokasi+"-RKN"+this.e_periode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into sc_rekon_m(no_rekon,tanggal,keterangan,periode,nik_user,tgl_input,kode_vendor) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_vendor.getText()+"')");
					
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];							
						if (line.status.toUpperCase() == "REKON") 
							sql.add("update sc_po_m set no_rekon='"+this.e_nb.getText()+"' where no_po='"+line.no_po+"'");
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
					this.sg.clear(1); this.sg2.clear(1); 										
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				var isAda = false;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					if (this.dataJU.rs.rows[i].status == "REKON") isAda = true;
				}
				if (!isAda){
					system.alert(this,"Transaksi tidak valid.","Tidak ada transaksi dengan status REKON.");
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sc_rekon_m","no_rekon",this.app._lokasi+"-RKN"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}
		if (sender == this.i_appAll) {
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].status = "REKON";
				line = this.dataJU.rs.rows[i];				
				tot += parseFloat(line.total);
			}
			this.e_total.setText(floatToNilai(tot));			
			this.doTampilData(this.page);
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {						
			this.sg.clear(1); 						
			this.sg2.clear(1); 	
			this.dataJU.rs.rows = [];
		}		
	},
	doLoad:function(sender){
		if (this.cb_vendor.getText()!="") {
			var strSQL = "select 'BELUM' as status,a.no_po,a.keterangan,convert(varchar,a.tanggal,103) as tanggal,a.nik_buat+' - '+b.nama as pembuat,a.kode_jenis+' - '+c.nama as jenis,a.nilai,a.ppn,(a.nilai+a.ppn) as total,a.no_bast,convert(varchar,d.tanggal,103) as tgl_bast "+
			             "from sc_po_m a inner join sc_karyawan b on a.nik_buat=b.nik "+
						 "               inner join sc_jenis c on a.kode_jenis=c.kode_jenis "+
						 "               inner join sc_bast_m d on a.no_bast=d.no_bast "+
						 "where a.kode_vendor='"+this.cb_vendor.getText()+"' and a.no_rekon='-'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);		
		}
	},
	doTampilData: function(page) {
		this.sg.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																	
			this.sg.appendData([line.status.toUpperCase(),line.no_po,line.keterangan,line.tanggal,line.pembuat,line.jenis,floatToNilai(line.nilai),floatToNilai(line.ppn),floatToNilai(line.total),line.no_bast,line.tgl_bast]);
		}
		this.sg.setNoUrut(start);
	},
	doChangeCells: function(sender, col , row) {			
		if (col == 0 ) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);						
			var line; var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				if (line.status.toUpperCase() == "REKON"){
					tot += parseFloat(line.total);
				}						
			}
			this.e_total.setText(floatToNilai(tot));
		}
	},		
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(2,row) != "") {
			this.sg2.clear(); 
			this.pc1.setActivePage(this.pc1.childPage[0]);
			var strSQL = "select a.no_pesan,e.nama as cc,a.kode_brg,b.nama as nama_brg,b.tipe,b.satuan,a.harga,a.jumlah,(a.jumlah*a.harga) as total,convert(varchar,due_date,103) as due_date,a.jam,a.no_terima,isnull(convert(varchar,c.tanggal,103),'-') as tgl_terima,isnull(c.jam_terima,'-') as jam_terima "+
			             "from sc_pesan_d a inner join sc_barang b on a.kode_brg=b.kode_brg "+						 
						 "                  inner join sc_pesan_m d on a.no_pesan=d.no_pesan "+
						 "                  inner join sc_cc e on d.kode_cc=e.kode_cc "+		
						 "                  left join sc_terima_m c on a.no_terima=c.no_terima "+						 
						 "where a.no_po='"+this.sg.cells(1,row) +"' order by a.no_urut";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.no_pesan,line.cc,line.kode_brg,line.nama_brg,line.tipe,line.satuan,floatToNilai(line.harga),floatToNilai(line.jumlah),floatToNilai(line.total),line.due_date,line.jam,line.no_terima,line.tgl_terima,line.jam_terima]);
				}
			} else this.sg2.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[1]);					
		}
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
