window.app_saku_inventory_transaksi_fGenBarcode = function(owner)
{
	if (owner)
	{
		window.app_saku_inventory_transaksi_fGenBarcode.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_inventory_transaksi_fGenBarcode";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Generate Barcode Barang", 0);	
		
		uses("portalui_saiCBBL;portalui_saiCBB;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;util_barcode");
		this.cb_kode = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Kode Barang",btnClick:[this,"doBtnClick"],rightLabelVisible:false});
		this.bLoad = new portalui_imageButton(this,{bound:[225,10,22,22],click:[this,"doLoadClick"],hint:"Search",image:"icon/"+system.getThemes()+"/reload.png"});
		this.e_nama = new portalui_saiLabelEdit(this,{bound:[20,11,400,20],caption:"Nama", maxLength:150});		
		this.e_tipe = new portalui_saiLabelEdit(this,{bound:[20,12,600,20],caption:"Tipe", maxLength:150});		
		this.cb_sat = new portalui_saiLabelEdit(this,{bound:[20,14,200,20],caption:"Satuan",readOnly:true});
		this.cb_sat2 = new portalui_saiLabelEdit(this,{bound:[20,16,200,20],caption:"Satuan2",readOnly:true});
		this.e_jumlah = new portalui_saiLabelEdit(this,{bound:[20,15,200,20],caption:"Jumlah",maxLength:15,tipeText:ttNilai,text:"0"});		
		this.bTampil = new portalui_button(this,{bound:[829,15,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
        		
		this.p1 = new portalui_panel(this,{bound:[10,16,900,343],caption:"Daftar Barang"});		
		this.sg1= new portalui_saiGrid(this.p1,{bound:[1,25,898,300],colCount:9,colTitle:["Kode Item","Barcode","Satuan1","Jumlah","Satuan2","Jumlah","Data","Image Width","Image Height"], 
            colWidth:[[8,7,6,5,4,3,2,1,0],[80,80,250,80,80,80,80,200,100]], rowHeight:50,colReadOnly:[true,[0,1,2,4,6,7,8],[]]});
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		try
		{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.barcode = new util_barcode();
			this.barcode.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku_inventory_transaksi_fGenBarcode.extend(window.portalui_childForm);
window.app_saku_inventory_transaksi_fGenBarcode.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from inv_brg_d where kode_brg = '"+this.cb_kode.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' ");
					var sqlText = "insert into inv_brg_d(kode_brg,barcode,sat1,jumlah1, sat2,jumlah2,imgstr,imgw,imgh,kode_lokasi) values ";					
					for (var i=0;i< this.sg1.getRowCount();i++){
					   if (i >0) sqlText += ",";
					   if (this.sg1.cells(6,i).search("server/tmp") != -1) this.getImageData($(this.getFullId()+"_img"+i),i);
	                   sqlText += "	('"+this.cb_kode.getText()+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"','"+parseNilai(this.sg1.cells(3,i))+"','"+this.sg1.cells(4,i)+"','"+parseNilai(this.sg1.cells(5,i))+"','"+this.sg1.cells(6,i)+"','"+this.sg1.cells(7,i)+"','"+this.sg1.cells(8,i)+"','"+this.app._lokasi+"')";
	                }
					sql.add(sqlText);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("update inv_brg set nama='"+this.e_nama.getText()+"',tipe='"+this.e_tipe.getText()+"',kode_klpbrg='"+this.cb_klp.getText()+"',sat='"+this.cb_sat.getText()+"',harga="+parseNilai(this.e_harga.getText())+" "+
						    "where kode_brg = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
										
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0]))
			{
				try
				{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from inv_brg "+
						    "where kode_brg = '"+this.cb_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
										
					this.dbLib.execArraySQL(sql);
				}
				catch(e)
				{
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);	
				setTipeButton(tbAllFalse);				
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doLoadClick: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider(" select a.nama,a.tipe,b.nama as nama_klp,a.sat,a.sat2,a.kode_klpbrg "+
				           " from inv_brg a inner join inv_brg_klp b on a.kode_klpbrg = b.kode_klpbrg and a.kode_lokasi=b.kode_lokasi "+
					       " where a.kode_lokasi = '"+this.app._lokasi+"' and a.kode_brg ='"+this.cb_kode.getText()+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined)
					{
						this.e_nama.setText(line.nama);
						this.e_tipe.setText(line.tipe);
						this.cb_sat.setText(line.sat);
						this.cb_sat2.setText(line.sat2);
						this.e_jumlah.setText(0);						
					}
                    setTipeButton(tbSimpan);					
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	getImageData: function(imgElm,i, nw, nh){
	    cnv = document.createElement("canvas");	    
        cnv.width = nw;
        cnv.height = nh;
        cnv.getContext("2d").drawImage(imgElm, 0, 0); 
	    if ((cnv.getImageData))
			var img =  cnv.getImageData(0,0,nw,nh);
		else if ((cnv.toDataURL))
			var img = cnv.toDataURL("image/png");
		else var img = "-";
        this.sg1.cells(6,i,img);
        this.sg1.cells(7,i,nw);
        this.sg1.cells(8,i,nh);
    },
    doLoadImg: function(event,i){
        var imgElm = document.all ? event.srcElement:event.target;        
        if (curvyBrowser.isWebKit || curvyBrowser.isIE || curvyBrowser.isOp){                    
            var nh = parseInt(imgElm.height);
            var nw = parseInt(imgElm.width);
        }else{
            var nw = imgElm.naturalWidth;
            var nh = imgElm.naturalHeight;
        }
        this.sg1.setColWidth([1],[nw]);
        if (i == 0) this.sg1.setRowHeight(nh,i);
        this.getImageData(imgElm, i, nw, nh);
    },
	doTampilClick: function(sender){
		try{	
            this.sg1.clear();		
            var nb = this.standarLib.noBuktiOtomatis(this.dbLib,"inv_brg_d","barcode",this.cb_kode.getText()+"-","0000");
            var frmt = this.cb_kode.getText()+"-";
            var formatFloat = "0000", res, img="-",bc, imgElm, imgSrc;
            for (var i=0;i < nilaiToFloat(this.e_jumlah.getText());i++){                
                imgSrc = this.barcode.getBarcode("code39",nb);
                bc = "<img src='"+imgSrc+"' id='"+this.getFullId()+"_img"+i+"' onload='$$("+this.resourceId+").doLoadImg(event,"+i+");'>-</img>";                
                this.sg1.appendData([nb,bc,this.cb_sat.getText(),0,this.cb_sat2.getText(),0,imgSrc,0,0]);                                
                tmp = nb;
    		    res = parseFloat(tmp.substr(frmt.length));
    		    res++;
                result = res.toString();
                for (var j =0;j < formatFloat.length;j++)
                {
                    if (result.length < formatFloat.length)
                    result = "0" + result;      
                }
                nb = frmt+result;
            }	            
		}catch(e){		
			systemAPI.alert(e);
		}
	},
	doBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_kode) 
			{   
			    this.standarLib.showListData(this, "Daftar Barang",sender,undefined, 
											  "select kode_brg, nama  from inv_brg where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_brg) from inv_brg where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_brg","nama"],"and",["Kode Barang","Nama"],false);				
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e)
			{
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
