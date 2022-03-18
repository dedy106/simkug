window.app_sc_transaksi_fPesanBAST = function(owner)
{
	if (owner)
	{
		window.app_sc_transaksi_fPesanBAST.prototype.parent.constructor.call(this,owner);
		this.className  = "app_sc_transaksi_fPesanBAST";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form BAST Pesanan: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});						
		this.cb_vendor = new saiCBBL(this,{bound:[20,16,200,20],caption:"Vendor", multiSelection:false, maxLength:10,change:[this,"doChange"]});
		this.cb_po = new saiCBBL(this,{bound:[20,15,220,20],caption:"No PO", multiSelection:false, maxLength:10,change:[this,"doLoad"]});
		
		this.p1 = new panel(this,{bound:[20,23,980,375],caption:"Daftar Item Pesanan"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-45],colCount:11,tag:0,		            
					colTitle:["No Pesan","Cost Center","Kode Barang","Nama Barang","Spesifikasi","Satuan","Harga","Jumlah","Total","Due Date","Jam"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[60,80,60,60,60,50,200,150,80,150,100]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9,10],[]],
					colFormat:[[7,8,9],[cfNilai,cfNilai,cfNilai]], 					
					autoAppend:false,defaultRow:1});		
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
						
			this.cb_vendor.setSQL("select kode_vendor, nama from sc_vendor",["kode_vendor","nama"],false,["Kode","Nama"],"where","Data Vendor",true);					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_sc_transaksi_fPesanBAST.extend(window.childForm);
window.app_sc_transaksi_fPesanBAST.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sc_bast_m","no_bast",this.app._lokasi+"-BA"+this.e_periode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into sc_bast_m(no_bast,tanggal,keterangan,periode,nik_user,tgl_input,kode_vendor,no_po) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_vendor.getText()+"','"+this.cb_po.getText()+"')");					
					sql.add("update sc_po_m set no_bast='"+this.e_nb.getText()+"' where no_po='"+this.cb_po.getText()+"' ");
					
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
				 this.simpan();
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sc_bast_m","no_bast",this.app._lokasi+"-BA"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}
		if (sender == this.i_appAll) {
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].status = "BAST";
			}
			this.doTampilData(this.page);
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {						
			this.sg.clear(1); 						
			this.dataJU.rs.rows = [];
		}
		if (sender == this.cb_vendor && this.cb_vendor.getText()!="") {						
			this.sg.clear(1); 						
			this.cb_po.setSQL("select no_po, keterangan from sc_po_m where no_bast='-' and periode <='"+this.e_periode.getText()+"'",["no_po","keterangan"],false,["No PO","Keterangan"],"and","Data PO",true);					
		}		
	},
	doLoad:function(sender){
		if (this.cb_vendor.getText()!="") {
			var strSQL = "select a.no_pesan,e.nama as cc,a.kode_brg,b.nama as nama_brg,b.tipe,b.satuan,a.harga,a.jumlah,(a.harga*a.jumlah) as total,convert(varchar,a.due_date,103) as due_date,a.jam "+
			             "from sc_pesan_d a inner join sc_barang b on a.kode_brg=b.kode_brg "+						 
						 "                  inner join sc_pesan_m d on a.no_pesan=d.no_pesan "+
						 "                  inner join sc_cc e on d.kode_cc=e.kode_cc "+						 
						 "where a.no_po='"+this.cb_po.getText()+"' ";
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
			this.sg.appendData([line.no_pesan,line.cc,line.kode_brg,line.nama_brg,line.tipe,line.satuan,floatToNilai(line.harga),floatToNilai(line.jumlah),floatToNilai(line.total),line.due_date,line.jam]);
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
